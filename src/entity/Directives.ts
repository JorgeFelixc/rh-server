import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne, OneToMany, JoinColumn, ManyToOne,} from "typeorm";
import { Status } from "./Status";
import { User } from "./Users";
import { UserRoles } from "./Users_roles";

@Entity()
export class Directive {

    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    directive: User;
 
    @ManyToOne(type => User, user => user.id)
    @JoinColumn()
    coachs: User[];

}