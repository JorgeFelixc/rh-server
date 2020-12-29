import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne, JoinColumn,} from "typeorm";
import { Attachments } from "./Attachments";
import { Status } from "./Status";
import { User } from "./Users";
import { UserRoles } from "./Users_roles";

@Entity()
export class Candidate {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    wishSalary: string;
    
    @Column()
    title: string;

    @Column({nullable:true})
    functionalTitle: string;

    @Column()
    company: string;
    
    @Column()
    seniority: string;
    
    @Column()
    industry: string;

    @Column()
    relocation: boolean;

    @Column()
    statusProcess: number;

    @Column()
    location: string;
    
    @OneToOne(type => User)
    @JoinColumn()
    user: User;



}