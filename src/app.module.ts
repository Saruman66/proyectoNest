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
import { RedisProvider } from './redis.provider';  
// Provider que crea la conexión con Redis
// Permite que cualquier servicio de la app use Redis
// ----------------------------------------------

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
  ],
  controllers: [AppController],  
  // Registra los controladores de este módulo

  providers: [
    AppService,  
    // Registra los servicios de este módulo

    // -------------------- REDIS --------------------
    RedisProvider,  
    // Este provider permite usar Redis en cualquier servicio de la app
    // ----------------------------------------------
  ],
})
export class AppModule {}  
// Define el módulo principal de la aplicación
