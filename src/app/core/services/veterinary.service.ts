import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Veterinary } from 'src/app/shared/models/veterinary';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {
  url: string = 'https://consultoriovet-eb010.web.app/api/veterinaries';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  save(veterinary: Veterinary, token: string):Observable<any>{
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    let body = JSON.stringify(veterinary)
    if(veterinary.idveterinary===undefined){
      return this.http.post(this.url, body, httpHeader)
    }else{
      return this.http.put(this.url.concat('/').concat(veterinary.idveterinary), body, httpHeader)
    }
  }

  retrieve(id: string):Observable<Veterinary>{
    return this.http.get<Veterinary>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id: string, token: string):Observable<any>{
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

  list():Observable<Veterinary[]>{
    return this.http.get<Veterinary[]>(this.url, this.httpOptions)
    .pipe(
     
    )
  }




}
