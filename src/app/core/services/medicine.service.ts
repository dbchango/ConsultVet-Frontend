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

  save(medicine: Medicine):Observable<any>{
    let body = JSON.stringify(medicine);
    if(medicine.idmedicine==undefined){
      return this.http.post(this.url, body, this.httpOptions);
    }else{
      return this.http.put(this.url.concat('/').concat(medicine.idmedicine), body, this.httpOptions)
    }
  }

  retrieve(id: string):Observable<Medicine>{
    return this.http.get<Medicine>(this.url.concat('/').concat(id), this.httpOptions)
    .pipe(
      retry(1),
    )
  }

  delete(id:string):Observable<any>{
    return this.http.delete(this.url.concat('/').concat(id), this.httpOptions)
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
