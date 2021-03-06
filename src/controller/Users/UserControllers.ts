import {Request, Response} from "express";
import {getManager} from "typeorm";
import { User } from "../../entity/Users";
import { BuildToken, isLogged } from "../../middleware/JWT";



export async function getAllUsers(request: Request, response: Response){

    //obtengo el userManager;
    const userManagers = getManager().getRepository(User);

    const users = await userManagers.find();
    
    response.send(users);
}


export async function logIn(request: Request, response: Response){
    const { email, password } = request.body;
    
    if(!email || !password){
        response.status(404).send({error: 'Params incompletes.'});
        return;
    }

    const userManagers = getManager().getRepository(User);
    const user = await userManagers.findOne({
         where: {
            email: email, 
            password:password,
        }, 
        join: {
            alias:'user',
            leftJoinAndSelect: {
                "role": 'user.role',
                "status": 'user.status',
            }
        }
    }, );


    if(!user){
        response.status(401).send({error: 'Wrong Credentials.'});
        return;
    }

    const token = BuildToken(user.email, user.id);
    response.setHeader("token", token);
    // console.log("user:", user);
    response.send({
        jwt: token,
        user: {
            firstName: user.firstName,
            lastName: user.lastName,
            email:user.email,
            role:user.role,
            image: user.image,
        }
    })
    // console.log("usuario:", user);
}

export async function postUser(request:Request, response:Response){
    
    
}


export async function Me(request:Request, response:Response){
    const { id } = await isLogged(request, response);

    if(!id){
        response.status(403).send({error: 'Youre not logged in.'});
        return;
    }

    const userManagers = getManager().getRepository(User);
    const userData = await userManagers.findOne({where: { 
        id: id,
    },
    join: {
        alias:'user',
        leftJoinAndSelect: {
            "role": 'user.role',
            "status": 'user.status',
        }
    }});

    delete (await userData).password;
    if(userData){
        response.send(userData)
        return;
    }

    response.status(404).send({error: 'You not loggin'});

}


