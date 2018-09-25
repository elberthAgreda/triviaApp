<<<<<<< Updated upstream
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpProxyService } from './http.proxy.service';
import { AppVariable } from '../config/app.variables';
import { Register } from '../models/register.model';
import { Nivel } from '../models/nivel.model';

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

    /** @description obtiene las preguntas por Nivel */
    public login<T>( request:string ) : Observable<T>{
        return this.proxyGame.post<T>(AppVariable.login,request);
    }

    /** @description obtiene las preguntas por Nivel */
    public register<T>( request:Register ) : Observable<T>{
        return this.proxyGame.put<T>(AppVariable.register,request);
    }

    /** @description obtiene las preguntas por Nivel */
    public saveProgress<T>( request:Nivel ) : Observable<T>{
        return this.proxyGame.put<T>(AppVariable.saveProgress,request);
    }
=======
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpProxyService } from './http.proxy.service';
import { AppVariable } from '../config/app.variables';

@Injectable()
export class CustomSevice{
  
    private proxy: HttpProxyService;

    constructor(private http: HttpClient) {
        let serviceUri = AppVariable.baseurl + AppVariable.preguntas;
        this.proxy  = new HttpProxyService(http, serviceUri);
    }

    /** @description obtiene las preguntas por categoria */
    public getPreguntas<T>( categoria:string ) : Observable<T>{
        return this.proxy.getByQuery<T>(categoria);
    }
        
>>>>>>> Stashed changes
}