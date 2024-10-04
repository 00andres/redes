import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class torneo {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    iduser: number

    @Column()
    idequipo: number

}
