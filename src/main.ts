import { NestFactory } from '@nestjs/core';
// NestFactory: utilidad de NestJS para crear la aplicación (instancia de AppModule)

import { AppModule } from './app.module';
// AppModule: módulo principal de la aplicación donde están configurados todos los demás módulos

import { RedisService } from './redis/redis.service';
// Importamos RedisService para poder llamar al método de prueba temporal
// 🔹 Solo necesario para la prueba de Redis

async function bootstrap() {
  // Crear la aplicación NestJS usando AppModule
  const app = await NestFactory.create(AppModule);
  
  // -------------------- BLOQUE TEMPORAL DE PRUEBA REDIS --------------------
  // 🔹 Este bloque es solo para probar la conexión a Redis desde la consola
  // 🔹 No afecta el funcionamiento normal de la app y se puede eliminar luego
  const redisService = app.get(RedisService);
  // Usamos app.get para obtener la instancia de RedisService que NestJS ya inyectó
  await redisService.testRedis();
  // Ejecutamos el método temporal de prueba que guarda, lee y elimina un valor en Redis
  // Los logs se verán en consola mostrando si la conexión funciona correctamente
  // -----------------------------------------------------------------------

  // Iniciar el servidor HTTP de NestJS
  await app.listen(process.env.PORT ?? 3000);
  // Por defecto escucha en puerto 3000 si no hay variable de entorno PORT
}

bootstrap();
