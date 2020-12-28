export interface IRoutes {
    path: string;
    method: string;
    action: Function;
    authRequired: boolean;
}