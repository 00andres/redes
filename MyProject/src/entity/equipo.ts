import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity() 
export class IDequipo{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    descripcion:string
    @Column()
    serie:string
}
