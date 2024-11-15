import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() // Asegúrate de que la clase esté decorada como un ObjectType de GraphQL
@Entity()
export class Torneo {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  fechaInicio: Date;

  @Column()
  @Field()
  fechaFin: Date;
}
