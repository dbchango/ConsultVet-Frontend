import { Component, OnInit } from '@angular/core';
import { Vaccine } from 'src/app/shared/models/vaccine';

@Component({
  selector: 'app-vaccine-main',
  templateUrl: './vaccine-main.component.html',
  styleUrls: ['./vaccine-main.component.css']
})
export class VaccineMainComponent implements OnInit {

  mainVacccine: Vaccine;
  mainTitle: string;
  mainReload: boolean;
  constructor() { }

  ngOnInit(): void {
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
