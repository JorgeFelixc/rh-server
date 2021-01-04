import candidatesRoutes from "./controller/Candidates/CandidateRoutes";
import userRoutes from "./controller/Users/UserRoutes";

/**
 * All application routes.
 */
export const AppRoutes = [
    ...userRoutes,
    ...candidatesRoutes
];