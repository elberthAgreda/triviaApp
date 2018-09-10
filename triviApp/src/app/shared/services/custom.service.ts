import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpProxyService } from './http.proxy.service';
import { AppVariable } from '../config/app.variables';

@Injectable()
export class CustomSevice{
  
    private proxy: HttpProxyService;
    private proxyGrupo: HttpProxyService;

    constructor(private http: HttpClient) {
        let serviceUri = AppVariable.baseurl + AppVariable.preguntas;
        let serviceGrupoUri = AppVariable.baseurl + AppVariable.grupos;
        this.proxy  = new HttpProxyService(http, serviceUri);
        this.proxyGrupo = new HttpProxyService(http, serviceGrupoUri);
    }

    /** @description obtiene las preguntas por categoria */
    public getPreguntas<T>( categoria:string ) : Observable<T>{
        return this.proxy.getByQuery<T>(categoria);
    }
    /** @description obtiene las preguntas por categoria */
    public getGrupos<T>( categoria:string ) : Observable<T>{
        return this.proxyGrupo.getByQuery<T>(categoria);
    }
}