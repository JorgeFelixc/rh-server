import "reflect-metadata";
import {createConnection} from "typeorm";
import {Request, Response} from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import {AppRoutes} from "./routes";
import morgan = require("morgan");
import { validarJWT } from "./middleware/JWT";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests
createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(morgan("dev"))

    // Cors activation.
    app.use((req,res,next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
        // bodyParser.json({limit:'50mb'});
        // bodyParser.urlencoded({extended:true, limit:'50mb',parameterLimit:50000});
        next();
    })

    // app.use(express.json);

    // register all application routes
    AppRoutes.forEach(route => {
        app[route.method]('/api/'+route.path,route.authRequired ? [validarJWT] : [] , (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    console.log(app.routes);

    // run app 
    app.listen(5000);

    console.log("Express application is up and running on port 5000");

}).catch(error => console.log("TypeORM connection error: ", error));
