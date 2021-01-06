import { IRoutes } from "../../utils/interfaces";
import { deleteCandidate, getCandidates, getOneCandidate, postCandidate } from "./CandidateControllers";

const candidatesRoutes: IRoutes[] = [
    {
        path:'/candidates',
        method:'get',
        action:getCandidates,
        authRequired: true,
    },
    {
        path:'/candidates',
        method:'post',
        action: postCandidate,
        authRequired:true,
    },
    {
        path:'/candidates/:id',
        method:'get',
        action: getOneCandidate,
        authRequired:true,
    },
    {
        path:'/candidates/:id',
        method:'delete',
        action:deleteCandidate,
        authRequired:true,
    }

] 

export default candidatesRoutes;