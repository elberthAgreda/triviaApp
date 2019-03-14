import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class HttpProxyService {
  
  private url : string;
  
  constructor(private http: HttpClient, private endpoint: string) {
    this.url = endpoint; 
  }

  /** @description Metodo que permite Obtener datos por GET con parametros */
  public getByQuery<T>( service:string ) : Observable<T>{
    return this.http.get<T>(this.url + service);
  }

  /** @description Metodo que permite Obtener datos por GET con parametros */
  public get<T>( service: string, queryParam: string ): Observable<T> {
    const params = new HttpParams({ fromString: queryParam });
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<T>(this.url + service, { headers, params});
  }

  /** @description Metodo que permite Obtener datos por POST */
  public post<T>(service:string, request ) : Observable<T>{
    return this.http.post<T>( this.url + service, request, this.getHeaders() );
  }

  /** @description Metodo que permite Obtener datos por PUT */
  public put<T>(service:string, request ) : Observable<T>{    
    return this.http.put<T>( this.url + service, request, this.getHeaders() );
  }

  /** @description Metodo que permite agregar cabeceras a la peticion */
  private getHeaders(){
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');
   return {headers};
  }  

}