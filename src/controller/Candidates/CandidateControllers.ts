import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Candidate } from "../../entity/Candidates";
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

        const candidateManager = getManager().getRepository(Candidate);
        const candidateService = await candidateManager.create({
            ...candidate,
            user: {
                ...candidate.user,
                status: 1,
                role: 4,
                password: 'c4ndidat3.',
            }
        });

        if(candidateService){
            response.send({ok:'Candidate create suscefully'});
            return;
        }

        response.status(400).send({error:'Error al crear candidato'});

    }
    catch(ex){
        response.status(400).send({error:ex});
    }
}