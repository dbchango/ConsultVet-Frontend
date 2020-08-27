import { Injectable } from '@angular/core';
import { Pet } from '../../shared/models/pet';
import { Vaccine } from '../../shared/models/vaccine';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable, of } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Consult } from 'src/app/shared/models/consult';



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
    let petBody = JSON.stringify(pet);
    if(pet.idpet===undefined){
      return this.http.post(this.url, petBody,this.httpOptions)
     
    }else{
      return this.http.put(this.url.concat('/').concat(pet.idpet), petBody, this.httpOptions)
    }
  }

  retrieve(id: string):Observable<Pet>{
    return this.http.get<Pet>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id: string):Observable<any>{
    return this.http.delete(this.url.concat('/').concat(id),  this.httpOptions)
    .pipe(
      
    )
  }

  list():Observable<Pet[]>{
    return this.http.get<Pet[]>(this.url, this.httpOptions)
    .pipe(
     
    )
  }

  listConsults(id: string): Observable<Consult[]>{
    return this.http.get<Consult[]>(this.url.concat('/').concat(id).concat('/consults'), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

}
