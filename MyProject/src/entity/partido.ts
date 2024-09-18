import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class IDpartido{
    @PrimaryGeneratedColumn()
    id:number 
    @Column()
    idtorneo:number
    @Column()
    idequipo1:number
    @Column()
    idequipo2:number
    @Column()
    goles1:number
    @Column()
    goles2:number
    @Column()
    observaciones:string    
} 
