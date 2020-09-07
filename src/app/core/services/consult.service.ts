import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Consult } from 'src/app/shared/models/consult';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConsultService {

  url: string = 'https://consultoriovet-eb010.web.app/api/consults';
  baseurl:string = 'https://consultoriovet-eb010.web.app/api'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };


  constructor(private http:HttpClient) { }

  save(consult: Consult, token:string) : Observable<any>{
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    let petBody = JSON.stringify(consult);
    if(consult.idconsult===undefined){
      return this.http.post(this.url, petBody,httpHeader)
     
    }else{
      return this.http.put(this.url.concat('/').concat(consult.idconsult), petBody, httpHeader)
    }
  }

  retrieve(id: string):Observable<Consult>{
    return this.http.get<Consult>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id: string, token:string):Observable<any>{
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    return this.http.delete(this.url.concat('/').concat(id),  httpHeader)
    .pipe(
      
    )
  }

  count():Observable<any>{
    return this.http.get<any>(this.baseurl.concat('/count/consults'))
  }

  list():Observable<Consult[]>{
    return this.http.get<Consult[]>(this.url, this.httpOptions)
    .pipe(
     
    )
  }
  listPage(page:number, limit:number, token: string): Observable<Consult[]> {
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    return this.http.get<Consult[]>(this.baseurl.concat('/page/consults/').concat(String(page)).concat('/').concat(String(limit)), httpHeader)
      .pipe(
        retry(1)  
      )
  }


}
