import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
    // Registra la entidad User para que TypeORM pueda inyectarla en el servicio
  ],
  providers: [UserService],  // Servicio que manejará la lógica de la base de datos
  controllers: [UserController], // Controlador que expondrá endpoints
})
export class UserModule {}
