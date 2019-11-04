import { Nivel } from "./nivel.model";
import { User } from "./user.model";

export class UserData {
    nivel:Nivel;
	users:User[];
	userName:string;
	teamName:string;
	password:string;
	ciudad:string;
	agencia:string;
	cedula1:string;
	cedula2:string;
}