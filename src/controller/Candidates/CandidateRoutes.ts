import { IRoutes } from "../../utils/interfaces";
import { getCandidates, postCandidate } from "./CandidateControllers";

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
    }

] 

export default candidatesRoutes;