import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne, OneToMany, JoinColumn,} from "typeorm";
import { Candidate } from "./Candidates";
import { Status } from "./Status";
import { User } from "./Users";
import { UserRoles } from "./Users_roles";

@Entity()
export class UserCandidate {

    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(type => User)
    @JoinColumn()
    recruiter: User;
 
    @OneToMany(type => Candidate, user => user.id, { cascade: true})
    @JoinColumn()
    candidate: Candidate[];

}