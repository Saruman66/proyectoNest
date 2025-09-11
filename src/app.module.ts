import { Module } from '@nestjs/common';  
// Importa el decorador @Module de NestJS para definir un módulo

import { ConfigModule } from '@nestjs/config';  
// Permite cargar variables de entorno desde un archivo .env

import { TypeOrmModule } from '@nestjs/typeorm';  
// Permite integrar TypeORM (ORM para bases de datos) con NestJS

import { AppController } from './app.controller';  
// Importa el controlador principal de la aplicación

import { AppService } from './app.service';  
// Importa el servicio principal de la aplicación

import { UserModule } from './user/user.module';  
// Importa el módulo de usuarios (contiene entidad, servicio y controlador de usuarios)

// -------------------- REDIS --------------------
import { RedisModule } from './redis/redis.module';  
// Importamos RedisModule en lugar de RedisProvider/RedisService directamente.
// Esto hace que Redis quede encapsulado y reutilizable.
// ------------------------------------------------

@Module({
  imports: [
    ConfigModule.forRoot(),  
    // Inicializa ConfigModule para que todas las variables de .env estén disponibles en process.env

    // -------------------- POSTGRESQL --------------------
    TypeOrmModule.forRoot({
      type: 'postgres',  
      // Tipo de base de datos: PostgreSQL

      host: process.env.DB_HOST,  
      // Host de la base de datos (desde .env)

      port: Number(process.env.DB_PORT),  
      // Puerto de la base de datos (convertido a número)

      username: process.env.DB_USERNAME,  
      // Usuario para conectarse a la base de datos

      password: process.env.DB_PASSWORD,  
      // Contraseña para conectarse a la base de datos

      database: process.env.DB_NAME,  
      // Nombre de la base de datos

      autoLoadEntities: true,  
      // Carga automáticamente todas las entidades registradas en los módulos

      synchronize: true,  
      // Sincroniza automáticamente las tablas de la base de datos con tus entidades
    }),
    // ------------------------------------------------------

    UserModule, 
    // Módulo que encapsula todo lo relacionado a usuarios (entidad, servicio, controlador)

    RedisModule, 
    // 🚀 Importante: al importar RedisModule, toda la aplicación ya puede
    // usar RedisService sin tener que registrar RedisProvider/RedisService manualmente.
    // Esto mantiene el código más limpio, organizado y modular.
  ],
  controllers: [AppController],  
  // Registra los controladores de este módulo

  providers: [
    AppService,  
    // Servicio principal de la aplicación
    // ❌ Ya no es necesario poner aquí RedisProvider o RedisService
    // porque eso ya está incluido en RedisModule
  ],
})
export class AppModule {}  
// Define el módulo principal de la aplicación
// 👉 Su importancia: es el "punto de entrada" de todos los demás módulos.
// Ahora incluye PostgreSQL (base de datos relacional) y Redis (cache/almacenamiento rápido).
