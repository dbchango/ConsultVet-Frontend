import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../shared/models/pet';
import { PetService } from '../../../core/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { Vaccine } from 'src/app/shared/models/vaccine';
import { VaccineReference } from 'src/app/shared/models/vaccine-reference';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css']
})
export class PetInfoComponent implements OnInit {
  pet = new Pet;
  flagToQuery:Boolean = false;
  //vaccines : Vaccine[];
  constructor(private petService: PetService, private activeRoute: ActivatedRoute, private authService:AuthService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{     
        if(params['id']){
          this.petService.retrieve(params['id'])
          .subscribe(result=> {
            this.pet = result
            this.pet.idpet=params['id'];
            if(result.vaccines===undefined){
              this.pet.vaccines = []
            }else{
              this.pet.vaccines= result.vaccines
            }

            this.flagToQuery = true;
            console.log(this.pet)
    
          })
        }
      }
    );
    this.authService.getToken();
  }

  save(){
    this.petService.save(this.pet, this.authService.userToken).subscribe(
      result=>{
        if(result.icon==='success'){
          Swal.fire(result);
        }
      }
    )
  }

  addVaccine($event){
    console.warn($event);
    let vaccineref = new VaccineReference();
    vaccineref.date = new Date().toDateString();
    vaccineref.name = $event.name;
    vaccineref.description = $event.description;
    this.pet.vaccines.push(vaccineref)
  }

}
