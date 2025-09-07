import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users') // La ruta será /users
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body('name') name: string): Promise<User> {
    return this.userService.create(name);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
