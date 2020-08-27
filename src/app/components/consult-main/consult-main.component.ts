import { Component, OnInit } from '@angular/core';
import { Consult } from 'src/app/shared/models/consult';

@Component({
  selector: 'app-consult-main',
  templateUrl: './consult-main.component.html',
  styleUrls: ['./consult-main.component.css']
})
export class ConsultMainComponent implements OnInit {
  mainReload: Boolean;
  mainTitle: String;
  mainConsult: Consult;
  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.onInit();
    console.warn(this.mainConsult)
  }

  onInit(){
    this.mainConsult = new Consult;
    this.mainTitle = "Registro de una nuevo consulta";
  }

  reloadDone($event){
    this.mainReload = !$event;
  }
  reloadToDo($event){
    this.mainReload = $event;
    if(this.mainReload){
      console.log("Main call to reload list")
    }
    this.onInit();
  }

  mainUpdate($event){
    this.mainConsult = $event;
    this.mainTitle = "Actualizar el registro de "+$event.idconsult;
  }

  

}
