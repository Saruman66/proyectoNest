import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';

// @Global hace que RedisService esté disponible en toda la app sin necesidad
// de importar RedisModule en cada módulo que lo use
@Global()
@Module({
  imports: [ConfigModule],           // Para poder usar variables de entorno desde .env
  providers: [RedisService],         // Provee el servicio RedisService
  exports: [RedisService],           // Lo exporta para que otros módulos puedan usarlo
})
export class RedisModule {}          // ✅ Asegúrate de exportar la clase


// -------------------- EXPLICACIÓN DE CAMBIOS --------------------
// Antes había RedisProvider, múltiples imports y lógica repetida para crear la conexión.
// Cada módulo que quería usar Redis tenía que registrarlo manualmente.
// Esto generaba mucho código, duplicación y errores de configuración (por ejemplo, ECONNREFUSED).

// Ahora, con RedisModule global:
// 1. Solo necesitamos RedisService, que centraliza toda la conexión y métodos de Redis.
// 2. @Global permite que RedisService esté disponible en cualquier módulo automáticamente.
// 3. Eliminamos RedisProvider y configuraciones duplicadas.
// 4. El código es mucho más limpio, modular y fácil de mantener.

// -------------------- POSIBLES DESVENTAJAS --------------------
// 1. Al ser @Global, cualquier módulo puede acceder a RedisService sin control explícito, 
//    lo que podría dificultar pruebas unitarias aisladas si no se usa mocking adecuado.
// 2. Si en el futuro se quisiera usar múltiples instancias de Redis para diferentes módulos, 
//    la configuración global podría limitar la flexibilidad.
// 3. Los errores en RedisService afectan potencialmente a toda la aplicación 
//    porque todos los módulos dependen de la misma instancia.





















// import { Module } from '@nestjs/common';
// // @Module: Decorador de NestJS que define un módulo

// import { ConfigModule } from '@nestjs/config';
// // Permite usar variables de entorno desde un archivo .env

// import { TypeOrmModule } from '@nestjs/typeorm';
// // Permite integrar TypeORM (ORM para bases de datos) con NestJS

// import { AppController } from './app.controller';
// // Controlador principal de la app

// import { AppService } from './app.service';
// // Servicio principal de la app

// import { UserModule } from './user/user.module';
// // Módulo de usuarios (entidad, servicio y controlador)

// // -------------------- REDIS --------------------
// import { RedisModule } from './redis/redis.module';
// // Importamos RedisModule actualizado, que ahora crea la conexión usando .env
// // y expone RedisService a toda la aplicación
// // ------------------------------------------------

// @Module({
//   imports: [
//     ConfigModule.forRoot(),
//     // Inicializa ConfigModule para que las variables de .env estén disponibles en process.env

//     // -------------------- POSTGRESQL --------------------
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DB_HOST,
//       port: Number(process.env.DB_PORT),
//       username: process.env.DB_USERNAME,
//       password: process.env.DB_PASSWORD,
//       database: process.env.DB_NAME,
//       autoLoadEntities: true,
//       synchronize: true,
//     }),
//     // ---------------------------------------------------

//     UserModule,
//     // Módulo de usuarios

//     RedisModule,
//     // 🚀 RedisModule actualizado:
//     // Ahora crea la instancia de Redis automáticamente usando REDIS_HOST y REDIS_PORT del .env
//     // y la comparte con toda la app sin necesidad de importar RedisModule en cada módulo.
//   ],
//   controllers: [AppController],
//   providers: [AppService],
//   // ❌ Ya no necesitamos registrar RedisProvider/RedisService manualmente
// })
// export class AppModule {}

// // -------------------- CAMBIOS REALIZADOS --------------------
// // 1. RedisModule ahora se importa como módulo global (@Global) y exporta RedisService.
// // 2. RedisModule crea la instancia de Redis dinámicamente usando .env.
// // 3. Se eliminó RedisProvider externo; toda la configuración se centraliza en RedisModule.
// // 4. Ahora cualquier módulo puede inyectar RedisService sin necesidad de importar RedisModule.
// // 5. Esto evita errores ECONNREFUSED al intentar conectarse a Redis porque la configuración ya es correcta.

// // Esta clase define el módulo de Redis en sí mismo.
// // 🔹 Es importante porque:
// //   - Le da identidad al módulo (sin esta clase, NestJS no lo reconoce).
// //   - Permite importar RedisModule en AppModule u otros módulos.
// //   - Centraliza la configuración y hace que Redis sea un bloque independiente,
// //     reutilizable y fácil de mantener dentro de la arquitectura de NestJS.











// // Sin RedisModule

// // Tienes que importar manualmente RedisProvider y RedisService en AppModule.

// // Si mañana quieres usar Redis en otro módulo (ej: AuthModule), tendrías que volver a registrarlos ahí también.

// // Esto genera duplicación y riesgo de errores.

// // 🔹 Con RedisModule

// // Solo defines la configuración de Redis una sola vez dentro de RedisModule.

// // Como el módulo exporta RedisService, cualquier otro módulo que necesite Redis solo tiene que importar RedisModule.

// // NestJS maneja las inyecciones de dependencias de manera centralizada y optimizada.

// // ⚡ Beneficios de eficiencia

// // Menos duplicación de código → más fácil de mantener.

// // Menos riesgo de errores → si hay que cambiar cómo te conectas a Redis, solo lo haces en un lugar.

// // Carga modular → NestJS inicializa RedisModule una sola vez, y luego comparte la misma instancia de RedisService en toda la app (no abre conexiones innecesarias).

// // Escalabilidad → si el proyecto crece y agregas más módulos, Redis seguirá funcionando sin necesidad de reconfigurar nada.