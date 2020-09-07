import { Component, OnInit } from '@angular/core';
import { Medicine } from 'src/app/shared/models/medicine';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicine-main',
  templateUrl: './medicine-main.component.html',
  styleUrls: ['./medicine-main.component.css']
})
export class MedicineMainComponent implements OnInit {
  mainMedicine: Medicine;
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
