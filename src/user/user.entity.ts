/**
 * 📌 ¿Por qué es necesario este archivo?
 * 
 * Este archivo define la **Entidad User**, que representa la tabla "user" en la base de datos PostgreSQL.
 * En NestJS con TypeORM, una **entidad** es una clase que mapea directamente a una tabla de la base de datos.
 * 
 * ✅ Importancia de este archivo:
 * - Define cómo se estructura la tabla en PostgreSQL (campos, tipos de datos, restricciones).
 * - Permite que TypeORM maneje automáticamente la creación de la tabla y su sincronización.
 * - Se utiliza en los repositorios y servicios (`UserService`) para realizar operaciones CRUD (crear, leer, actualizar, borrar).
 * - Es la base de toda la lógica de usuarios (registro, login, balance de tokens, etc.).
 * 
 * 👉 En resumen: sin la entidad, tu aplicación no sabría cómo guardar ni recuperar información de los usuarios.
 */

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity() // Marca la clase como una tabla en la base de datos
export class User {
  @PrimaryGeneratedColumn()
  id: number; 
  // 🔹 Clave primaria autoincremental -> genera IDs únicos para cada usuario automáticamente.

  @Column({ unique: true })
  email: string; 
  // 🔹 Correo electrónico del usuario.
  // `unique: true` evita que se repitan correos en la base de datos.

  @Column()
  password: string; 
  // 🔹 Contraseña del usuario (se guardará encriptada con bcrypt más adelante).

  @Column({ default: 0 })
  balance: number; 
  // 🔹 Tokens o saldo del usuario.
  // Se inicializa en 0 por defecto cuando se crea un nuevo usuario.

  @CreateDateColumn()
  createdAt: Date; 
  // 🔹 Fecha de creación -> se asigna automáticamente cuando se inserta el usuario.

  @UpdateDateColumn()
  updatedAt: Date; 
  // 🔹 Fecha de última actualización -> cambia automáticamente cada vez que se actualiza un registro.
}




// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()  // Marca la clase como una tabla en la base de datos
// export class User {  // <-- IMPORTANTE: debe tener 'export'
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;
// }
