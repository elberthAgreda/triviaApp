import { Nivel } from "./nivel.model";
import { User } from "./user.model";

export class ResponseModel{

    nivel:Nivel;
    users:User[];
    userName:string;
    teamName:string;
}