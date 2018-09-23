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
        
}