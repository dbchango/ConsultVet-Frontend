import { Component, OnInit } from '@angular/core';
import { Client } from '../../shared/models/client';

@Component({
  selector: 'app-client-main',
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.css']
})
export class ClientMainComponent implements OnInit {


  mainClient: Client;
  mainTitle: string;
  mainReload: boolean;
  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.onInit();
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
