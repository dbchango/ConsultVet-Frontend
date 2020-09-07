import { Injectable } from '@angular/core';
import { Client } from '../../shared/models/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, from } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Pet } from '../../shared/models/pet';
import { Consult } from 'src/app/shared/models/consult';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = 'https://consultoriovet-eb010.web.app/api/clients';
  baseurl:string = 'https://consultoriovet-eb010.web.app/api'
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  save(client: Client, token: string): Observable<any> {
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    let clientBody = JSON.stringify(client);
    console.log(clientBody);
    if (client.idclient === undefined) {
      return this.http.post(
        this.url, clientBody, httpHeader
      )
    } else {
      return this.http.put(this.url.concat('/').concat(client.idclient), clientBody, httpHeader)
    }
  }

  retrieve(id: string):Observable<Client>{
    return this.http.get<Client>(this.url.concat('/').concat(id),this.httpOptions)
    .pipe(
      retry(1), 
    );
  }

  delete(id: string, token: string): Observable<any> {
    console.warn(token)
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    console.log(id);
    return this.http.delete(this.url.concat('/').concat(id), httpHeader)
      .pipe(
        retry(1)
      )
  }

  

  listInterval(limit: number, last:number): Observable<Client[]>{
    let lim = String(limit);
    let las = String(last);
    return this.http.get<Client[]>(this.url.concat('/interval/').concat(lim).concat('/').concat(las), this.httpOptions)
      .pipe(
        retry(1)
      )
  }

  listClientPets(id: string):Observable<Pet[]>{
    return this.http.get<Pet[]>(this.url.concat('/').concat(id).concat('/pets'), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  listConsults(id: string): Observable<Consult[]>{
    return this.http.get<Consult[]>(this.url.concat('/').concat(id).concat('/consults'), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  count():Observable<any>{
    return this.http.get<any>(this.baseurl.concat('/count/clients'))
  }

  list(page:number, limit:number): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseurl.concat('/page/clients/').concat(String(page)).concat('/').concat(String(limit)), this.httpOptions)
      .pipe(
        retry(1)  
      )
  }

}
