import { Request, Response, NextFunction } from 'express'
import * as JWT from 'jsonwebtoken';
import {Key} from '../utils/config';

//**  ********* */
//  Aqui estan todos los metodos para hacer la autenticación por medio de tokens.
// 
// 


//Se encarga de desencriptar el token que llega por la cabecera y verificar que sea el mismo token si no manda un error  403(forbbiden)
export async function validarJWT(req: Request, res: Response, next: NextFunction) {
    let token = <string>req.headers["authorization"];
    // Necesitamos quitarle el Bearer al string..
    token = token.split(' ')[1];

    let JWTPayload;
    try {
        JWTPayload = await <any>JWT.verify(token, Key);
        res.locals.JWTPAyload = JWTPayload;
    }
    catch (error) {
        res.status(403).send({error: 'youre not logged'});
        return;
    }

    next();
}


//Metodo para saber si esta logeado y retorna valores.
export async function isLogged(req: Request, res: Response) {
    let token = <string>req.headers["authorization"];
    token = token.split(' ')[1];

    let JWTPayload;

    try {
        JWTPayload = <any>JWT.verify(token, Key);
        res.locals.JWTPAyload = JWTPayload;
    }
    catch (error) {
        res.status(401).send();
        return { };
    }


    const {  email, id  } = JWTPayload;
    return {
        email: email,
        id: id,
    };

}

// Metodo para construir el token.
export function BuildToken(email:string, id:number){
    // Información del token
    const payload = {
        email:email,
        id:id
    }

    // Opciones del token.
    const options: JWT.SignOptions = { 
        expiresIn: '1h',
    }

    const token = JWT.sign(payload, Key, options);
    return token;
}