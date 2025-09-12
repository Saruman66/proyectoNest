// redis.service.ts
// Este archivo define RedisService, un servicio que abstrae la comunicación con Redis.
// Su función principal es permitir guardar (set) y obtener (get) datos de Redis de forma sencilla.
// Esto es útil para cachear información, reducir consultas a la base de datos y mejorar el rendimiento de la aplicación.

import { Injectable, Inject } from '@nestjs/common';
// Importa dos decoradores esenciales de NestJS:
// - @Injectable → Marca esta clase como "inyectable", lo que significa que puede usarse como un servicio en otros módulos.
// - @Inject → Permite inyectar dependencias manualmente (en este caso, el cliente Redis).

import { REDIS_CLIENT } from './redis.provider';
// Importa el "token" que definimos en redis.provider.ts para identificar la instancia del cliente Redis.
// Esto es necesario porque Redis no es un servicio de NestJS nativo, así que necesitamos un identificador.

import { Redis } from 'ioredis';
// Importa el tipo de cliente Redis desde la librería ioredis, para que TypeScript sepa qué métodos (set, get, etc.) tiene.

@Injectable()
// Este decorador indica que RedisService es un servicio que puede ser inyectado en otros módulos/controladores/servicios.
// Es clave porque así NestJS lo registra en su "sistema de dependencias".

export class RedisService {
  constructor(
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis, 
    // Inyecta el cliente Redis usando el token REDIS_CLIENT definido en redis.provider.ts.
    // "private readonly redisClient: Redis" → guarda la instancia de Redis como propiedad de solo lectura de la clase.
    // Esto es fundamental: sin esta inyección, no tendríamos cómo comunicarnos con Redis.
  ) {}

  async set(key: string, value: string, ttl?: number) {
    // Método para guardar datos en Redis.
    // Parámetros:
    // - key → la clave bajo la cual guardamos el valor.
    // - value → el valor a guardar.
    // - ttl (opcional) → tiempo de vida del valor en segundos (para datos temporales como sesiones o caché).

    if (ttl) {
      await this.redisClient.set(key, value, 'EX', ttl);
      // Si se pasa un ttl, guarda el valor en Redis con un tiempo de expiración usando la opción 'EX' (expire).
      // Importante para que Redis no se llene de datos innecesarios.
    } else {
      await this.redisClient.set(key, value);
      // Si no se pasa un ttl, guarda el valor sin caducidad.
    }
  }

  async get(key: string) {
    // Método para leer datos desde Redis.
    // Busca la clave proporcionada y devuelve el valor (si existe).
    // Devuelve 'null' si la clave no existe en Redis.
    return await this.redisClient.get(key);
  }
}
