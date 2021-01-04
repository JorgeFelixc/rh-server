import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Candidate } from "../../entity/Candidates";
import { User } from "../../entity/Users";
import { GetUserRole, isLogged } from "../../middleware/JWT";
import { GetCandidates } from "../../utils/scripts";

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

}