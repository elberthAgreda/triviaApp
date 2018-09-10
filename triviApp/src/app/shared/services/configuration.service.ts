import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpProxyService } from '../../shared/services/http.proxy.service';
import { AppVariable } from '../../shared/config/app.variables';

@Injectable()
export class ConfigurationSevice{
  
    private proxy: HttpProxyService;
  
    constructor(private http: HttpClient) {
        let serviceUri = AppVariable.baseurl + AppVariable.preguntas;
        this.proxy  = new HttpProxyService(http, serviceUri);
    }

    /** @description obtiene los canditatos */
    /** @param codCamara codigo camara */
    public getCandidates<T>( codCamara:string ) : Observable<T>{
        return this.proxy.getByQuery<T>("/getCandidates", codCamara);
    }
}