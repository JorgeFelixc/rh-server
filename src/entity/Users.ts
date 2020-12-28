import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, OneToOne,} from "typeorm";
import { Status } from "./Status";
import { UserRoles } from "./Users_roles";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;


    @Column()
    phone: string;

    @Column()
    password: string;

    @Column("path", {nullable:true})
    image:string;

    @OneToOne(type => UserRoles)
    @JoinTable()
    role:UserRoles;

    @OneToOne(type => Status)
    @JoinTable()
    status:Status;

    

}