import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Partido {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    idTorneo!: number;

    @Column()
    idEquipo1!: number;

    @Column()
    idEquipo2!: number;

    @Column()
    golesEquipo1!: number;

    @Column()
    golesEquipo2!: number;

    @Column({ nullable: true }) // Opcional, puede ser nulo
    observacion?: string;
}
