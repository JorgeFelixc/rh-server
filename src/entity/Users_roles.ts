import {Entity, PrimaryGeneratedColumn, Column,} from "typeorm";

@Entity()
export class UserRoles {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;


}