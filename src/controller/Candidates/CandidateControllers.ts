import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Candidate } from "../../entity/Candidates";
import { Coach } from "../../entity/Coach";
import { Directive } from "../../entity/Directives";
import { User } from "../../entity/Users";
import { GetUserRole, isLogged } from "../../middleware/JWT";
import { GetCandidates, ObjectRemoveProperties } from "../../utils/scripts";

export async function getCandidates(request:Request, response:Response){
    const candidateManager = getManager().getRepository(Candidate);
    
    const user = await GetUserRole(request, response);
    if(!user){
        response.status(405).send({error:'Something wrong with candidates'});
    }

    const allCandidates = await GetCandidates(user);

    response.send(allCandidates);
}

export async function postCandidate(request:Request, response:Response){
    try{
        const { candidate } = request.body;
        // console.log(request.body);
        const recruiter = await GetUserRole(request, response);
        if(!recruiter){
            response.status(403).send({error:'Youre not logged'});
            return;
        }
        const userManager = getManager().getRepository(User);
        const userService = await userManager.save({
            ...candidate.user,
            status: 1,
            role: 4,
            password: 'c4ndidat3.',
        })

        // console.log("userService", userService);

        const candidateManager = getManager().getRepository(Candidate);
        const candidateService = await candidateManager.save({
            ...candidate,
            user: userService,
            recruiter: recruiter,
        });

        if(candidateService){
            // console.log("service:", candidateService);
            response.send({ok:'Candidate create suscefully'});
            return;
        }

        response.status(400).send({error:'Error al crear candidato'});

    }
    catch(ex){
        console.error("error:", ex);
        response.status(400).send({error:"wrong creating your candidate."});
    }
}


export async function getOneCandidate(request:Request, response:Response){
    try{
        const { id } = request.params;

        // console.log(request.body);
        // console.log(request.params);
        if(!id){
            response.status(400).send({error:'Bad request'});
            return;
        }
        const candidateManager = getManager().getRepository(Candidate);
        const candidate = await candidateManager.findOne(id, {
            join:{
                alias:'cand',
                leftJoinAndSelect: {
                    "recruiter": 'cand.recruiter',
                    "user": 'cand.user',
                }
            }
        });
        if(candidate){
            const formated = ObjectRemoveProperties(candidate, ['password']);
            response.send(candidate);
        }
    }
    catch(ex){
        console.log(ex);
        response.status(400).send({error:"wrong creating your candidate."});
    }
}

export async function deleteCandidate(request:Request, response:Response){
    try{
        const { id } = request.params;
        if(id){
            response.status(400).send({error:'Bad request'});
            return;
        }
        const candidateManager = getManager().getRepository(Candidate);
        const candidate = await candidateManager.delete(id);
        if(candidate){
            response.send(candidate);
        }
    }
    catch(ex){
        console.log(ex);
        response.status(400).send({error:"wrong creating your candidate."});
    }
}

export async function getHierarchyDirective(request:Request, response:Response){

    const directiveManager = getManager().getRepository(Directive);
    const coachManager = getManager().getRepository(Coach);
    const candidateManager = getManager().getRepository(Candidate);

    let directives = await directiveManager.find({
        join: {
            alias:'dir',
            leftJoinAndSelect:{
                "directive": "dir.directive",
                "coach": "dir.coach",
            }
        },
    });
    
    let coachs = await coachManager.find({
        join: {
            alias:'coach',
            leftJoinAndSelect:{
                "recruiter": "coach.recruiter",
                "coach": "coach.coach",
            }
        },
    });

    let candidates = await candidateManager.find({
        join: {
            alias:'cand',
            leftJoinAndSelect: {
                "recruiter": 'cand.recruiter',
                "user": 'cand.user',
            }
        }
    });

    // cleaning data and formating
    let directiveFormated = ObjectRemoveProperties(directives, ['password']);
    directives = [];

    let coachFormated = ObjectRemoveProperties(coachs, ['password']);
    coachs = [];

    let candidatesFormated = ObjectRemoveProperties(candidates, ['password']);
    candidates = [];


    // Formateo de datos:
    let formatedData = directives.map(item => { 
        let buffer:any = item;     
        buffer["recruiter"] = [];   
        coachs.map(jitem => { 

            if(jitem.coach.id === jitem.coach.id){
                buffer.recruiter.push(jitem.recruiters);
            } 
        });

        return buffer;
    });

    formatedData = formatedData.map(item => {
        let buffer:any = item;
        item.recruiter.map(value => { 
            
            candidates.map(jitem => { 
                if(jitem.recruiter === value.id){

                    
                }
            
            });

        })
    })

    // formatedData = ObjectRemoveProperties(formatedData, )
    response.send(formatedData);
}