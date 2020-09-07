import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Medicine } from 'src/app/shared/models/medicine';
import { Pet } from 'src/app/shared/models/pet';
import { renderFlagCheckIfStmt } from '@angular/compiler/src/render3/view/template';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  url: string = 'https://consultoriovet-eb010.web.app/api/medicines';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      Accept: 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  save(medicine: Medicine, token:string):Observable<any>{
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    let body = JSON.stringify(medicine);
    if(medicine.idmedicine==undefined){
      return this.http.post(this.url, body, httpHeader);
    }else{
      return this.http.put(this.url.concat('/').concat(medicine.idmedicine), body, httpHeader)
    }
  }

  retrieve(id: string):Observable<Medicine>{
    return this.http.get<Medicine>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id:string, token:string):Observable<any>{
    const httpHeader={
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization' : token
      })
    };
    return this.http.delete(this.url.concat('/').concat(id), httpHeader)
    .pipe(
      retry(1)
    )
  }

  list():Observable<Medicine[]>{
    return this.http.get<Medicine[]>(this.url, this.httpOptions)
    .pipe(
      retry(1)
    )
  }

}
