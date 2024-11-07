import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transaccion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    idPartido!: number; 

    @Column()
    idUsuario!: number; 
    @Column()
    tipo!: string; 
    @Column()
    fecha!: Date; 

    @Column({ nullable: true }) 
    observacion?: string; 
}
