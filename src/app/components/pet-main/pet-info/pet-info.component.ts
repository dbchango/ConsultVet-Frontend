import { Component, OnInit } from '@angular/core';
import { Pet } from '../../../shared/models/pet';
import { PetService } from '../../../core/services/pet.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pet-info',
  templateUrl: './pet-info.component.html',
  styleUrls: ['./pet-info.component.css']
})
export class PetInfoComponent implements OnInit {
  pet = new Pet;

  constructor(private petService: PetService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{     
        if(params['id']){
          this.petService.retrieve(params['id'])
          .subscribe(result=> {
            this.pet = result
            console.log(this.pet)
    
          })
        }
      }
    );
    
  }
}
