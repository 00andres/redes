import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Equipo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column()
  serie!: string;
}
