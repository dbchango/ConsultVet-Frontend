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

  save(veterinary: Veterinary):Observable<any>{
    let body = JSON.stringify(veterinary)
    if(veterinary.idveterinary===undefined){
      return this.http.post(this.url, body, this.httpOptions)
    }else{
      return this.http.put(this.url.concat('/').concat(veterinary.idveterinary), body, this.httpOptions)
    }
  }

  retrieve(id: string):Observable<Veterinary>{
    return this.http.get<Veterinary>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id: string):Observable<any>{
    return this.http.delete(this.url.concat('/').concat(id),  this.httpOptions)
    .pipe(
      
    )
  }

  list():Observable<Veterinary[]>{
    return this.http.get<Veterinary[]>(this.url, this.httpOptions)
    .pipe(
     
    )
  }




}
