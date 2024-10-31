
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class torneo{
    @PrimaryGeneratedColumn()
    id!:number 
    @Column()
    descripcion!:string
}