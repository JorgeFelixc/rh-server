import { IRoutes } from "../../utils/interfaces";
import { getCandidates } from "./CandidateControllers";

const candidatesRoutes: IRoutes[] = [
    {
        path:'/candidates',
        method:'get',
        action:getCandidates,
        authRequired: true,
    },

] 

export default candidatesRoutes;