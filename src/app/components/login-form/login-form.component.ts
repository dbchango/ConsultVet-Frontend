import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  submitted:boolean;

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    
  }


  async logIn(email, password){
    console.warn(email + ' ' +password)
    await this.authService.signIn(email, password);
    if(this.authService.userLogged){
      console.warn('User Logged')
      Swal.fire({
        title : "Bienvenid@",
        text : "Ingreso satisfactorio",
        icon : "success"
      });
      this.router.navigate(['/']);
    }
  }

  onReset(){
    this.router.navigate(['/']);
  }

}
