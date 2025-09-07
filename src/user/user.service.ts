import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Repositorio para hacer consultas a la tabla User
  ) {}

  create(name: string): Promise<User> {
    const user = this.userRepository.create({ name });
    return this.userRepository.save(user); // Inserta en la base de datos
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find(); // Devuelve todos los usuarios
  }
}
