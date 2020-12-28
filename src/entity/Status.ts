import {Entity, PrimaryGeneratedColumn, Column, JoinTable,} from "typeorm";

@Entity()
export class Status {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

}