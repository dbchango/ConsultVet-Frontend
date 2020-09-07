import { Component, OnInit } from '@angular/core';
import { Client } from '../../shared/models/client';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.css']
})
export class ClientMainComponent implements OnInit {

  mainClient: Client;
  mainTitle: string;
  mainReload: boolean;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.userToken===undefined){
      this.router.navigate(['/login'])
    }
    this.mainReload = false;
    this.onInit();
    console.warn(this.authService.userToken)
  }

  onInit(){
    this.mainTitle = "Registro de cliente";
    this.mainClient = new Client;
  }

  reloadDone($event){
    this.mainReload = !$event;
  }

  reloadToDo($event){
    this.mainReload = $event;
    if(this.mainReload){
      console.log('Main call to reload');
    }
    this.onInit();
  }

  mainUpdate($event){
    this.mainClient = $event;
    this.mainTitle = "Actualizar el registro de "+$event.name;
  }

}
