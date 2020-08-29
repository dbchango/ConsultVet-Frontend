import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/core/services/pet.service';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/shared/models/pet';
import Swal from 'sweetalert2';
import { VaccineReference } from 'src/app/shared/models/vaccine-reference';

@Component({
  selector: 'app-serve-pet',
  templateUrl: './serve-pet.component.html',
  styleUrls: ['./serve-pet.component.css']
})
export class ServePetComponent implements OnInit {
  pet = new Pet;
  flagToQuery:Boolean = false;
  constructor(private petService: PetService, private activeRoute: ActivatedRoute) { }

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
  }
  save(){
    this.petService.save(this.pet).subscribe(
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
