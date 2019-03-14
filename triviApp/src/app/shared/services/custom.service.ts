import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpProxyService } from './http.proxy.service';
import { AppVariable } from '../config/app.variables';
import { Register } from '../models/register.model';
import { Nivel } from '../models/nivel.model';
import { UserData } from '../models/userData.model';

@Injectable()
export class CustomSevice{

    private proxy: HttpProxyService;
    private proxyGame: HttpProxyService;

    constructor(private http: HttpClient) {
        this.proxy  = new HttpProxyService(http, AppVariable.baseurl);
        this.proxyGame  = new HttpProxyService(http, AppVariable.baseGame);
    }

    /** @description obtiene las preguntas por Nivel */
    public getPreguntas<T>( nivel:string ) : Observable<T>{
        return this.proxy.getByQuery<T>(AppVariable.preguntas+nivel);
    }

    /** @description Autentificacion */
    public login<T>( request:any ) : Observable<T>{
        return this.proxyGame.post<T>(AppVariable.login, request);
    }

    /** @description obtiene las ciudades */
    public cities<T>( request:UserData ) : Observable<T>{
        return this.proxyGame.post<T>(AppVariable.ciudades, request);
    }

    /** @description obtiene las agencias */
    public agencies<T>( request:UserData ) : Observable<T>{
        return this.proxyGame.post<T>(AppVariable.agencias, request);
    }

    /** @description registro de usuario */
    public register<T>( request:Register ) : Observable<T>{
        return this.proxyGame.put<T>(AppVariable.register,request);
    }

    /** @description guardar progreso */
    public saveProgress<T>( request:Nivel ) : Observable<T>{
        return this.proxyGame.put<T>(AppVariable.saveProgress,request);
    }

    /** @description validar si usuario existe */
    public validarUsuarioGrupo<T>( request:UserData ) : Observable<T>{
        return this.proxyGame.post<T>(AppVariable.validarUsuarioGrupo, request);
    }

    /** @description cambiar password */
    public change<T>( request:UserData ) : Observable<T>{
        return this.proxyGame.post<T>(AppVariable.change, request);
    }

    /** @description validar si usuario existe */
    public getUserName<T>( identifier: string ) : Observable<T>{
        const request = `identifier=${identifier}`;
        return this.proxyGame.get<T>(AppVariable.getUserName, request);
    }

}