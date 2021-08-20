import { Puntuacion } from "./puntuacion.model";

export class VideoModel{
    titulo:string = '';
    descripcion:string = '';
    video:string = '';
    imagen:string = '';
    puntuacion:Puntuacion | null = null;
}