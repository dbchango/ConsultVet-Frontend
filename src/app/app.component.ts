import { Component, OnInit } from '@angular/core';
import { faPaw } from '@fortawesome/free-solid-svg-icons'
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor( private authService: AuthService, private router: Router) {}
  faPaw = faPaw;
  title = 'Consultorio Veterinario';
  ngOnInit(){ 
    this.authService.getToken();
  }

  log():boolean{
    if(this.authService.userToken!==undefined){
      return true
    }
  }

  logOut(){
    this.authService.logout();
    window.location.reload()
    
  }

}
