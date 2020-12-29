import { response } from "express";
import { getManager } from "typeorm";
import { Candidate } from "../entity/Candidates";
import { Coach } from "../entity/Coach";
import { Directive } from "../entity/Directives";
import { User } from "../entity/Users";
import { UserCandidate } from "../entity/UsersCandidates";


export async function GetCandidates(user:User){
    try{
        const directiveManager = getManager().getRepository(Directive);
        const coachManager = getManager().getRepository(Coach);
        const candidateManager = getManager().getRepository(UserCandidate);
    
    
        const directive = await directiveManager.findOne({where: { directive: user.id}});
        
        let recruitersID;
        if(directive){
            const coachsOfDirective = directive.coachs.map(item => item.id);
            const coachs = await coachManager.findByIds(coachsOfDirective);
            //obtiene todos los recruiters
            recruitersID = coachs.map(item => {
                return item.recruiters.map(res => res.id);
            }).reduce((acc, val) => [ ...acc, ...val ], []); // saca a todos de 1 array
    
        }
        else{
            const coach = await coachManager.find({ where: {coach: user.id}});
            recruitersID = coach.map(item => {
                return item.recruiters.map(res => res.id);
            }).reduce((acc, val) => [ ...acc, ...val ], []);
        }
    
        const candidates = await candidateManager.find({where:{ recruiter: recruitersID}});
        return candidates;
    }
    catch(ex){
        console.error("Error in candidates:", ex);
        return false;
    }
}