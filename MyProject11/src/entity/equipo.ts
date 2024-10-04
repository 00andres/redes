import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class equipo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string



}
