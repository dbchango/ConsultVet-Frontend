import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Vaccine } from 'src/app/shared/models/vaccine';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VaccineService {

  url: string = 'https://consultoriovet-eb010.web.app/api/vaccines';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  save(vaccine:Vaccine, token: string):Observable<any>{
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    let body = JSON.stringify(vaccine);
    if(vaccine.idvaccine===undefined){
      return this.http.post(this.url, body, httpHeader);
    }else{
      return this.http.put(this.url.concat('/').concat(vaccine.idvaccine), body, httpHeader)
    }
  }

  list():Observable<Vaccine[]>{
    return this.http.get<Vaccine[]>(this.url,this.httpOptions)
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
    return this.http.delete<any>(this.url.concat('/').concat(id), httpHeader)
    .pipe(
      retry(1)
    )
  }

}
