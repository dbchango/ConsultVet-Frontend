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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };


  constructor(private http:HttpClient) { }

  save(pet: Consult) : Observable<any>{
    let petBody = JSON.stringify(pet);
    if(pet.idpet===undefined){
      return this.http.post(this.url, petBody,this.httpOptions)
     
    }else{
      return this.http.put(this.url.concat('/').concat(pet.idpet), petBody, this.httpOptions)
    }
  }

  retrieve(id: string):Observable<Consult>{
    return this.http.get<Consult>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id: string):Observable<any>{
    return this.http.delete(this.url.concat('/').concat(id),  this.httpOptions)
    .pipe(
      
    )
  }

  list():Observable<Consult[]>{
    return this.http.get<Consult[]>(this.url, this.httpOptions)
    .pipe(
     
    )
  }


}
