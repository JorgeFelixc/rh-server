import {postGetAllAction} from "./controller/PostGetAllAction";
import {postGetByIdAction} from "./controller/PostGetByIdAction";
import {postSaveAction} from "./controller/PostSaveAction";
import userRoutes from "./controller/Users/UserRoutes";

/**
 * All application routes.
 */
export const AppRoutes = [
    ...userRoutes,
];