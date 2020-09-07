import { Component, OnInit } from '@angular/core';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-veterinary-main',
  templateUrl: './veterinary-main.component.html',
  styleUrls: ['./veterinary-main.component.css']
})
export class VeterinaryMainComponent implements OnInit {

  mainVeterinary: Veterinary;
  mainTitle: string;
  mainReload: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.userToken===undefined){
      this.router.navigate(['/login'])
    }
    this.mainReload = false;
    this.onInit();
  }

  onInit(){
    this.mainTitle = "Registro de Veterinario";
    this.mainVeterinary = new Veterinary();
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
    this.mainVeterinary = $event;
    this.mainTitle = "Actualizar el registro de "+$event.name;
  }

}
