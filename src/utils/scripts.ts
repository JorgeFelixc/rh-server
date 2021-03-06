import { response } from "express";
import { getManager, In } from "typeorm";
import { Candidate } from "../entity/Candidates";
import { Coach } from "../entity/Coach";
import { Directive } from "../entity/Directives";
import { User } from "../entity/Users";
import { UserCandidate } from "../entity/UsersCandidates";


export async function GetCandidates(user:User){
    try{
        const directiveManager = getManager().getRepository(Directive);
        const coachManager = getManager().getRepository(Coach);
        const candidateManager = getManager().getRepository(Candidate);
    
        // Recruiter simple logic
        if(user.role.description === 'recruiter'){
            let candidatesRecruiter = await candidateManager.find({
                where: {recruiter: user.id},
                join: {
                    alias:'cand',
                    leftJoinAndSelect: {
                        "recruiter": 'cand.recruiter',
                        "user": 'cand.user',
                    }
                }
            });
            // console.log("user:", candidatesRecruiter, user.id);
            if(candidatesRecruiter){
                // const newData = ObjectRemoveProperties(candidatesRecruiter, ['password']);
                return ObjectRemoveProperties(candidatesRecruiter, ['password']);
            }
            return false;
        }


        const directive = await directiveManager.find({
            where: { directive: user.id},
            join: {
                alias:'dir',
                leftJoinAndSelect:{
                    "directive": "dir.directive",
                    "coachs": "dir.coachs",
                }
            },
        });
        
        console.log("Directive: no", directive);
        let recruitersID;
        if(directive.length > 0){
            const coachsOfDirective = directive.map(item => item.coachs.id);
            const coachs = await coachManager.find({
                where: {coach: In(coachsOfDirective)},
                join: {
                    alias:'cos',
                    leftJoinAndSelect:{
                        "recruiters": "cos.recruiters",
                        "coach": "cos.coach",
                    }
                },
            });

            console.log("Coaches:",coachsOfDirective ,coachs);
            //obtiene todos los recruiters
            recruitersID = coachs.map(item => {
                return item.recruiters.id;
            })
            // .reduce((acc, val) => [ ...acc, ...val ], []); 
            // saca a todos de 1 array
    
        }
        else{
            const coach = await coachManager.find({
                 where: {coach: user},
                 join: {
                    alias:'coach',
                    leftJoinAndSelect: {
                        "recruiters": 'coach.recruiters',
                    }
                }
                });
            recruitersID = coach.map(item => {
                return item.recruiters.id;
            })
            // .reduce((acc, val) => [ ...acc, ...val ], []);
        }
        // console.log("recruiters:", recruitersID);
        const candidates = await candidateManager.find({
            where: { 
                recruiter: In(recruitersID),
            },
            join: {
                alias:'cand',
                leftJoinAndSelect: {
                    "recruiter": 'cand.recruiter',
                    "user": 'cand.user',
                }
            }
        });

        // console.log("candidatos:", candidates);
        return ObjectRemoveProperties(candidates, ["password"]);
    }
    catch(ex){
        console.error("Error in candidates:", ex);
        return false;
    }
}


export function ObjectRemoveProperties(data: object[] | object, properties: string[] ){

    if(Array.isArray(data)){
        return data.map(item => {
            Object.entries(item).map(value => {
                // Elimino la propiedad de item si esta existe.
                if(properties.indexOf(value[0]) !== -1){
                    delete item[value[0]];
                }
                
                if(!value[1]){
                    return;
                }
                // Accedo adentro de un posible objeto y hago recursiva la funcion.
                if(typeof value[1] === "object"){
                    item[value[0]] = ObjectRemoveProperties(value[1], properties);
                    return;
                } 
    
            })
    
            return item;
        });
    }
    let buffer = data;
    Object.entries(data).map(value => {
        // Elimino la propiedad de item si esta existe.
        if(properties.indexOf(value[0]) !== -1){
            delete buffer[value[0]];
        }
        if(!value[1]){
            return;
        }

        // Accedo adentro de un posible objeto y hago recursiva la funcion.
        if(typeof value[1] === "object"){
            buffer[value[0]] = ObjectRemoveProperties(value[1], properties);
            return;
        } 

    })
    return buffer;

}