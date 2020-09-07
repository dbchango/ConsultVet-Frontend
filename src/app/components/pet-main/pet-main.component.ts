import { Component, OnInit } from '@angular/core';
import { Pet } from '../../shared/models/pet';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-main',
  templateUrl: './pet-main.component.html',
  styleUrls: ['./pet-main.component.css']
})
export class PetMainComponent implements OnInit {

  mainPet: Pet; 
  mainTitle: String;
  mainReload: Boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.userToken===undefined){
      this.router.navigate(['/login'])
    }
    this.mainReload = false;
    this.onInit();
  }

  onInit(){
    this.mainPet = new Pet;
    this.mainTitle = "Registro de mascota";
  }

  reloadToDo($event){
    this.mainReload = $event;
    if(this.mainReload){
      console.log("Main call to reload List");
    }
    this.onInit();
  }

  reloadDone($event){
    this.mainReload = $event;
  }

  mainUpdate($event){
    this.mainPet = $event;
    this.mainTitle = "Actualizar el registro de "+$event.name;
  }

}
