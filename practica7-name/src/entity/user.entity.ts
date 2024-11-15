import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid') // Si el id es un UUID, será un string
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(type => Int)
  edad: number;
}
