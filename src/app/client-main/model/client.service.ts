import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  url: string = 'https://consultoriovet-eb010.web.app/api/clients';

  httpOptions = {
    headers:new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http:HttpClient) { }

  save(client: Client): Observable<any>{
    if(client.idclient===undefined){
      return this.http.post<Client>(
        this.url, JSON.stringify(client), this.httpOptions
      ).pipe(
        retry(1), tap(_=>this.log('Client created')),
        catchError(this.handleError<Client>('createClient'))
      );
    }
    return this.http.put(this.url.concat('/').concat(client.idclient), JSON.stringify(client), this.httpOptions)
    .pipe(
      retry(1), tap(_=>this.log('Client updated')),
      catchError(this.handleError<Client>('Update Client'))
    )
    
  };

  delete(id: string): Observable<any>{
    console.log(id);
    return this.http.delete(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1), 
      tap(_=>this.log('Client deleted')),
      catchError(this.handleError<Client>('Delete client'))
    )

  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any):Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private log(message: string){
    console.log(message)
  }
  
  list():Observable<Client[]>{
    return this.http.get<Client[]>(this.url, this.httpOptions)
    .pipe(
      retry(1),
      tap(_=> this.log('Client download')),
      catchError(this.handleError<Client[]>('listClients', []))
    )
  }



}
