import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  url: string = 'https://consultoriovet-eb010.web.app/api/auth';
  userLogged = false;
  userToken: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  };
  
  
  constructor(private http: HttpClient, private firebaseAuth: AngularFireAuth) { }

  signup(user: any):Observable<any>{
    let userBody = JSON.stringify(user);
    return this.http.post(this.url.concat('/signup'), userBody, this.httpOptions)
  }

  async signIn(email: string, password: string){
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
     res=>{
       console.warn(res);
       res.user.getIdToken().then(token=> this.userToken = token);
       this.userLogged = true;
       localStorage.setItem('user', JSON.stringify(res.user));
     } 
    )
  }

  getToken(){
    this.firebaseAuth.user.subscribe(
      result=> {
        result.getIdToken().then(token=>this.userToken = 'Bearer '+token)
        console.warn(result)
      }
      
    )
  }

  logout(){

    this.firebaseAuth.signOut();

    localStorage.removeItem('user')
  }
}
