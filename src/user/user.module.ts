// user.module.ts
// Define el módulo de usuarios. Su propósito:
// - Encapsula toda la funcionalidad relacionada con usuarios.
// - Centraliza controladores y servicios de usuarios.
// - Permite inyectar RedisService para caching y mejorar eficiencia de la aplicación.


import { Module } from '@nestjs/common';
// Importa el decorador @Module de NestJS que sirve para definir un módulo. 
// Un módulo encapsula componentes relacionados: controladores, servicios y otros módulos.

import { TypeOrmModule } from '@nestjs/typeorm';
// Importa TypeOrmModule para poder registrar entidades y conectarlas con la base de datos.

import { User } from './user.entity';
// Importa la entidad User, que define la estructura de la tabla en PostgreSQL.

import { UserService } from './user.service';
// Importa el servicio UserService, donde se maneja toda la lógica de negocio y acceso a la base de datos.

import { UserController } from './user.controller';
// Importa el controlador UserController, que expone endpoints de la API para interactuar con usuarios.

import { RedisModule } from '../redis/redis.module';
// Importa RedisModule para poder inyectar RedisService en UserService. 
// Esto permite cachear datos, mejorar performance y reducir consultas directas a la base de datos.


// @Module es un decorador de NestJS que define un módulo
// Un módulo agrupa controladores, servicios y otros módulos relacionados
// Le dice a NestJS qué componentes están disponibles dentro del módulo y cuáles se pueden importar/exportar
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // Registra la entidad User en TypeORM, permitiendo que UserService la use con repositorios.

    RedisModule, 
    // Importa RedisModule para habilitar inyección de RedisService en UserService.
    // Esto es importante para usar caching u otras funcionalidades rápidas de Redis.
  ],
  providers: [UserService],  
  // Registra el servicio UserService para que NestJS pueda inyectarlo en controladores u otros servicios.

  controllers: [UserController], 
  // Registra UserController para exponer endpoints HTTP relacionados con usuarios.
})
export class UserModule {}  

