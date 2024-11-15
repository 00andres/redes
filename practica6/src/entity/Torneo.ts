import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Torneo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;
}
