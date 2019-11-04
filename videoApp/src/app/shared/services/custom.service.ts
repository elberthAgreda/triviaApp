import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpProxyService } from './http.proxy.service';
import { AppVariable } from '../config/app.variables';
import { UserData } from '../models/userData.model';
import { Puntuacion } from '../models/puntuacion.model';

@Injectable()
export class CustomSevice{
  
    private proxy: HttpProxyService;
    private proxyGame: HttpProxyService;

    constructor(private http: HttpClient) {
        this.proxy  = new HttpProxyService(http, AppVariable.baseurl);
        this.proxyGame  = new HttpProxyService(http, AppVariable.baseGame);
    }

    /** @description obtiene las preguntas por Nivel */
    public getVideos<T>() : Observable<T>{
        return this.proxy.getByQuery<T>(AppVariable.videos);
    }

    /** @description obtiene las preguntas por Nivel */
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

    /** @description guardar voto */
    public saveVote<T>( request:Puntuacion ) : Observable<T>{
        return this.proxyGame.put<T>(AppVariable.gurdarVoto, request);
    }

    /** @description guardar voto */
    public scores<T>( request:UserData ) : Observable<T>{
        return this.proxyGame.put<T>(AppVariable.puntos, request);
    }

}