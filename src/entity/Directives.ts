import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne, OneToMany, JoinColumn,} from "typeorm";
import { Status } from "./Status";
import { User } from "./Users";
import { UserRoles } from "./Users_roles";

@Entity()
export class Directive {

    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(type => User)
    @JoinColumn()
    directive: User;
 
    @OneToMany(type => User, user => user.id)
    @JoinColumn()
    coachs: User[];

}