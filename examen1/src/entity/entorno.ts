import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { equipos } from "./equipos"; 
import { jugador } from "./jugador"; 
import { torneo } from "./torneo";   

@Entity()
export class entorno {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @OneToMany(() => equipos, (equipos) => equipos.entorno)
    equipos: equipos[];

    @OneToMany(() => jugador, (jugador) => jugador.entorno)
    jugadores: jugador[];

    @OneToMany(() => torneo, (torneo) => torneo.entorno)
    torneos: torneo[];

}
