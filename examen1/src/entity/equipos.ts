import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { entorno } from "./entorno"
@Entity()
export class equipos {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    jugadores: string

    @Column()
    equipoN: string 

    @Column()
    torneo: string

    @ManyToOne(() => entorno, (entorno) => entorno.equipos)
    entorno: entorno;

}
