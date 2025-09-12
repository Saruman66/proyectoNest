// user.controller.ts
// ---------------------------------------------------------------
// 📌 Propósito de este archivo:
// - Define el controlador de usuarios (UserController).
// - Expone endpoints HTTP (ej: /users) para que clientes externos
//   (como Postman, frontend o apps móviles) puedan interactuar
//   con la aplicación.
// - Se comunica con UserService para delegar la lógica de negocio.
// 
// 🔑 Importancia del controlador:
// - Traduce solicitudes HTTP → llamadas a métodos de servicio.
// - Devuelve respuestas al cliente (JSON).
// - Mantiene separada la lógica de negocio (UserService) de la 
//   lógica de transporte (HTTP).
// ---------------------------------------------------------------

import { Controller, Get, Post, Body } from '@nestjs/common';
// Importa decoradores de NestJS:
// - @Controller → Define una clase como controlador HTTP.
// - @Get → Define un endpoint GET.
// - @Post → Define un endpoint POST.
// - @Body → Extrae datos enviados en el cuerpo de la petición.

import { UserService } from './user.service';
// Importa UserService, que maneja la lógica de negocio 
// (guardar y consultar usuarios en PostgreSQL y Redis).

import { User } from './user.entity';
// Importa la entidad User, para definir el tipo de datos 
// que devolverán los endpoints.

@Controller('users')
// @Controller('users') → Todos los endpoints definidos aquí
// estarán bajo la ruta base "/users".
// Ejemplos:
// - POST /users
// - GET /users
export class UserController {
  // Inyectamos UserService para poder usar sus métodos
  constructor(private readonly userService: UserService) {}

  @Post()
  // Define un endpoint POST en "/users"
  // Sirve para crear un nuevo usuario
  create(@Body('name') name: string): Promise<User> {
    // @Body('name') → extrae el campo "name" del cuerpo de la petición
    // Llama a UserService.create(name) para insertar el usuario
    return this.userService.create(name);
  }

  @Get()
  // Define un endpoint GET en "/users"
  // Sirve para obtener la lista de todos los usuarios
  findAll(): Promise<User[]> {
    // Llama a UserService.findAll(), que puede usar Redis para cache
    // Devuelve un array de usuarios en formato JSON
    return this.userService.findAll();
  }
}

// ---------------------------------------------------------------
// 📌 Panorama general: 
// Este controlador es crucial porque expone la API de usuarios.
// - POST /users → Inserta en PostgreSQL y opcionalmente cachea en Redis.
// - GET /users → Devuelve usuarios; primero revisa Redis (si está activado),
//   y si no, consulta PostgreSQL, guardando en cache para futuras llamadas.
// ---------------------------------------------------------------
