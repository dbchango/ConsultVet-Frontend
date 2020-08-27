import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/shared/models/medicine';

@Component({
  selector: 'app-medicine-main',
  templateUrl: './medicine-main.component.html',
  styleUrls: ['./medicine-main.component.css']
})
export class MedicineMainComponent implements OnInit {
  mainMedicine: Medicine;
  mainTitle: string;
  mainReload: boolean;
  constructor() { }

  ngOnInit(): void {
    this.mainReload = false;
    this.onInit();
  }

  onInit(){
    this.mainTitle = "Registro de medicina";
    this.mainMedicine = new Medicine();
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
    this.mainMedicine = $event;
    this.mainTitle = "Actualizar el registro de "+$event.name;
  }

}
