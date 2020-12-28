import {Entity, PrimaryGeneratedColumn, Column, JoinTable,} from "typeorm";
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

    
}