import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, OneToOne, PrimaryColumn, JoinColumn, ManyToOne,} from "typeorm";
import { Status } from "./Status";
import { UserRoles } from "./Users_roles";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({nullable:true})
    image:string;

    @ManyToOne(type => UserRoles,user => user.id, {
        cascade:true,
        primary:false,
    })
    @JoinColumn()
    role:UserRoles;

    @ManyToOne(type => Status, {
        cascade:true,
        primary:false, 
    })
    @JoinColumn()
    status:Status;


    

}