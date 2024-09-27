
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class IDtorneo{
    @PrimaryGeneratedColumn()
    id:number 
    @Column()
    descripcion:string
}