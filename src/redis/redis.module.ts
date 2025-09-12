// -------------------------------------------------------------
// 📌 REDIS MODULE (redis.module.ts)
// -------------------------------------------------------------
// Este archivo define el módulo de Redis dentro de la aplicación NestJS.
// Se llama "redis.module.ts" porque su función es encapsular todo lo
// relacionado con Redis (conexión y operaciones) en un solo lugar.
//
// 🔹 ¿Por qué es importante?
// - Mantiene el código organizado y modular.
// - Permite que otras partes de la aplicación usen Redis sin duplicar lógica.
// - Hace que Redis sea fácilmente reutilizable y mantenible.
//
// 🔹 Propósito:
// - Proveer la conexión con Redis (via RedisProvider).
// - Exponer un servicio (RedisService) con métodos listos para usar (set/get).
// - Hacer que cualquier módulo que importe RedisModule pueda usar Redis.
// -------------------------------------------------------------

import { Module } from '@nestjs/common';  
// @Module: Decorador que marca esta clase como un módulo de NestJS

import { RedisProvider } from './redis.provider';  
// Provider que se encarga de crear y configurar la conexión con Redis

import { RedisService } from './redis.service';  
// Servicio que encapsula las operaciones con Redis (ej: set y get)

@Module({
  providers: [RedisProvider, RedisService],  
  // "providers" → Registramos las piezas internas de este módulo
  // RedisProvider: conexión a Redis
  // RedisService: lógica para usar Redis de forma sencilla

  exports: [RedisService],  
  // "exports" → Especifica qué compartimos con otros módulos.
  // Exportamos RedisService para que cualquier módulo que importe
  // RedisModule pueda usarlo sin preocuparse por la conexión interna.
})
export class RedisModule {}  
// Esta clase define el módulo de Redis en sí mismo.
// 🔹 Es importante porque:
//   - Le da identidad al módulo (sin esta clase, NestJS no lo reconoce).
//   - Permite importar RedisModule en AppModule u otros módulos.
//   - Centraliza la configuración y hace que Redis sea un bloque independiente,
//     reutilizable y fácil de mantener dentro de la arquitectura de NestJS.











// Sin RedisModule

// Tienes que importar manualmente RedisProvider y RedisService en AppModule.

// Si mañana quieres usar Redis en otro módulo (ej: AuthModule), tendrías que volver a registrarlos ahí también.

// Esto genera duplicación y riesgo de errores.

// 🔹 Con RedisModule

// Solo defines la configuración de Redis una sola vez dentro de RedisModule.

// Como el módulo exporta RedisService, cualquier otro módulo que necesite Redis solo tiene que importar RedisModule.

// NestJS maneja las inyecciones de dependencias de manera centralizada y optimizada.

// ⚡ Beneficios de eficiencia

// Menos duplicación de código → más fácil de mantener.

// Menos riesgo de errores → si hay que cambiar cómo te conectas a Redis, solo lo haces en un lugar.

// Carga modular → NestJS inicializa RedisModule una sola vez, y luego comparte la misma instancia de RedisService en toda la app (no abre conexiones innecesarias).

// Escalabilidad → si el proyecto crece y agregas más módulos, Redis seguirá funcionando sin necesidad de reconfigurar nada.