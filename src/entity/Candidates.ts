import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne,} from "typeorm";
import { Status } from "./Status";
import { User } from "./Users";
import { UserRoles } from "./Users_roles";

@Entity()
export class Candidate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descripcion: string;

    @Column()
    wishSalary: string;
    
    @Column()
    title: string;

    @Column({nullable:true})
    functionalTitle: string;

    @Column()
    company: string;
    
    @Column()
    location: string;
    
    @OneToOne(type => User)
    @JoinTable()
    user: User;

}