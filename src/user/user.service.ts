// user.service.ts
// Este archivo define UserService, que maneja toda la lógica de negocio relacionada con usuarios.
// Funciones principales:
// - Crear nuevos usuarios
// - Obtener la lista de todos los usuarios
// Además, se integra con Redis para cachear datos y mejorar rendimiento en consultas frecuentes

import { Injectable } from '@nestjs/common';
// @Injectable → marca la clase como un servicio que NestJS puede inyectar en otros lugares.

import { InjectRepository } from '@nestjs/typeorm';
// Permite inyectar un repositorio de TypeORM (para la entidad User en este caso).

import { Repository } from 'typeorm';
// Repositorio → clase de TypeORM que da acceso directo a la base de datos (CRUD).

import { User } from './user.entity';
// Entidad que representa la tabla "users" en PostgreSQL.

import { RedisService } from '../redis/redis.service';
// Servicio que usamos para guardar y leer información cacheada en Redis.

@Injectable()
// Este decorador convierte a UserService en un "provider" que NestJS puede gestionar e inyectar
// en controladores o en otros servicios.
export class UserService {
  constructor(
    @InjectRepository(User) // Inyecta automáticamente el repositorio de la entidad User
    private userRepository: Repository<User>, // Ahora podemos hacer consultas a la tabla "users"

    private readonly redisService: RedisService, // Inyectamos RedisService para poder usar cache
  ) {}

  async create(name: string): Promise<User> {
    // Método para crear un nuevo usuario
    // - Recibe un nombre
    // - Lo guarda en la base de datos
    // - Devuelve el usuario recién creado

    const user = this.userRepository.create({ name }); 
    // Crea un nuevo objeto User en memoria (todavía no lo guarda en DB)

    const savedUser = await this.userRepository.save(user); 
    // Inserta el usuario en la base de datos PostgreSQL

    // (Opcional) Podríamos guardar en Redis para cachear el usuario recién creado
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    // Método para obtener todos los usuarios
    // - Primero intenta leer de Redis (cache)
    // - Si no existe en cache, consulta en PostgreSQL y guarda en Redis

    const cacheKey = 'users:all'; 
    // Clave bajo la cual guardaremos/leeremos la lista de usuarios en Redis

    const cached = await this.redisService.get(cacheKey); 
    // Intenta obtener la lista desde Redis
    if (cached) {
      return JSON.parse(cached); // Si existe en cache, la devuelve sin consultar DB
    }

    const users = await this.userRepository.find(); 
    // Si no hay cache, consulta directamente en la base de datos

    await this.redisService.set(cacheKey, JSON.stringify(users), 60); 
    // Guarda el resultado en Redis con TTL de 60 segundos
    // Así, las próximas peticiones serán mucho más rápidas

    return users; 
    // Devuelve los usuarios obtenidos de la base de datos
  }
}

/*
🔑 Resumen de lo que agregamos en los comentarios:
- @Injectable → convierte a UserService en un servicio inyectable.
- constructor con @InjectRepository(User) → permite acceder al repositorio de User (tabla en PostgreSQL).
- async create → explica que crea un usuario en memoria, lo guarda en DB y lo devuelve.
- async findAll + cacheKey → muestra cómo usamos Redis para cachear la lista de usuarios.

📌 Efecto de este código:
- Más eficiencia → reduce consultas a la base de datos.
- Más claridad → cada paso de la lógica está explicado.
- Más escalabilidad → el caching con Redis permite soportar más tráfico.
*/
