import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { entorno } from "./entorno"
@Entity()
export class jugador {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    equipo: string

    @ManyToOne(() => entorno, (entorno) => entorno.jugadores)
    entorno: entorno;

} 

