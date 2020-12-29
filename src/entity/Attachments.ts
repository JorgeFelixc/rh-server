import {Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToOne, JoinColumn,} from "typeorm";
import { Candidate } from "./Candidates";
import { User } from "./Users";

@Entity()
export class Attachments {

    @PrimaryGeneratedColumn()
    id: number;

    @JoinTable()
    user: User

    @Column("path")
    resume:string;
    
    @Column("path")
    coverLetter:string;
    
    @Column("path")
    portfolio:string;
    
    @Column("path")
    reference:string;

    @Column("path")
    feeAgreement:string;

    @OneToOne(type => Candidate)
    @JoinColumn()
    candidate: Candidate;
}