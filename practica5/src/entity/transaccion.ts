import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transaccion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    idPartido!: number; // ID del partido relacionado

    @Column()
    idUsuario!: number; // ID del usuario que realiza la transacción

    @Column()
    tipo!: string; // Tipo de transacción (ej: "venta", "compra", etc.)

    @Column()
    fecha!: Date; // Fecha de la transacción

    @Column({ nullable: true }) // Opcional, puede ser nulo
    observacion?: string; // Observaciones adicionales
}
