import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { entorno } from "./entorno"
@Entity()
export class torneo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    nombre: string

    @Column()
    equipo: string

    @ManyToOne(() => entorno, (entorno) => entorno.torneos)
    entorno: entorno;
}
