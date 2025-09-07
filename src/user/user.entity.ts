import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()  // Marca la clase como una tabla en la base de datos
export class User {  // <-- IMPORTANTE: debe tener 'export'
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
