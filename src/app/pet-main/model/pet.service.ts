import { Injectable } from '@angular/core';
import { Pet } from './pet';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { retry, tap, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  url: string = 'https://consultoriovet-eb010.web.app/api/pets';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http:HttpClient) { }
  save(pet: Pet) : Observable<any>{
    if(pet.idpet===undefined){
      return this.http.post(this.url, JSON.stringify(pet),this.httpOptions)
      .pipe(
        retry(1), tap(_ => this.log('Pet added')),
        catchError(this.handleError<Pet>('Create Pet'))
      );
    }
    return this.http.put(this.url.concat('/').concat(pet.idpet), JSON.stringify(pet), this.httpOptions)
    .pipe(
      retry(1), tap(_=>this.log('Pet updated')),
      catchError(this.handleError<Pet>('Update Pet'))
    )

  }

  delete(id: string):Observable<any>{
    return this.http.delete(this.url.concat('/').concat(id),  this.httpOptions)
    .pipe(
      retry(1), tap(_=>this.log('Pet deleted')),
      catchError(this.handleError<Pet>('Delete pet')),
    )
  }

  list():Observable<Pet[]>{
    return this.http.get<Pet[]>(this.url, this.httpOptions)
    .pipe(
      retry(1), tap(_=>this.log('Pets downloaded')),
      catchError(this.handleError<Pet[]>('List pets', []))
    )
  }

  private log(message: string) {
    console.log(message);
  }
  
  private handleError<T>(operation='operation', result?:T){
    return (error:any):Observable<T>=>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
