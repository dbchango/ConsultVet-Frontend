import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url: string = 'https://consultoriovet-eb010.web.app/api/auth';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };

  signup(user: any):Observable<any>{
    let userBody = JSON.stringify(user);
    return this.http.post(this.url.concat('/signup'), userBody, this.httpOptions)
  }
}
