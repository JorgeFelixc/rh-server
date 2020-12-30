import { IRoutes } from "../../utils/interfaces";
import { getAllUsers, logIn, Me } from './UserControllers';

const userRoutes: IRoutes[] = [
    {
        path:'/users',
        method:'get',
        action:getAllUsers,
        authRequired: false,
    },
    {
        path:'/user/auth',
        method:'post',
        action: logIn,
        authRequired: false,
    },
    {
        path:'/user/me',
        method:'get',
        action: Me,
        authRequired:true,
    }
] 

export default userRoutes;