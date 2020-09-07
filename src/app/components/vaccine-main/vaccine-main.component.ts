import { Component, OnInit } from '@angular/core';
import { Vaccine } from 'src/app/shared/models/vaccine';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vaccine-main',
  templateUrl: './vaccine-main.component.html',
  styleUrls: ['./vaccine-main.component.css']
})
export class VaccineMainComponent implements OnInit {

  mainVacccine: Vaccine;
  mainTitle: string;
  mainReload: boolean;
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.authService.userToken===undefined){
      this.router.navigate(['/login'])
    }
    this.mainReload = false;
    this.onInit();
  }


  onInit(){
    this.mainTitle = "Registro de vacuna";
    this.mainVacccine = new Vaccine;
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
    this.mainVacccine = $event;
    this.mainTitle = "Actualizar el registro de "+$event.name;
  }

}
