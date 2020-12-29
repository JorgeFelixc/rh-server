import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne, OneToMany, JoinColumn, ManyToOne, ManyToMany,} from "typeorm";
import { Status } from "./Status";
import { User } from "./Users";
import { UserRoles } from "./Users_roles";

@Entity()
export class Coach {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, type => type.id )
    @JoinColumn()
    coach: User;
 
    @ManyToOne(type => User, type => type.id )
    @JoinColumn()
    recruiters: User[];

}