import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from '../../../core/services/pet.service';
import { Pet } from '../../../shared/models/pet';
import Swal from 'sweetalert2';
import { faQuoteLeft, faIdCard, faVenusMars, faCalendarDay,   faSave, faBackspace, faDog } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {


  faSave = faSave;
  faBackspace =faBackspace;
  faQuoteLeft= faQuoteLeft;
  faIdCard = faIdCard;
  faVenusMars = faVenusMars;
  faCalendarDay = faCalendarDay;
  faDog = faDog;



  formPet:FormGroup;
  submitted = false;
  @Input() pet : Pet;
  @Input() title: string;
  @Output() flagToReaload = new EventEmitter<Boolean>();

  constructor(private petService : PetService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.formPet = this.formBuilder.group({
      name: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      type: ['', [Validators.required]],
      age: ['', [Validators.required]],
      color: ['', [Validators.required]],
      idclient: ['', [Validators.required]],
    })
  }

  get f(){
    
    return this.formPet.controls;
  }

  onReset():void{
    this.submitted = false;
    this.formPet.reset();
  }

  onSubmit(): void{
    this.submitted=true;
    if(this.formPet.invalid){
      console.log('Form Invalid');
      return;
    }
    this.petService.save(this.pet).subscribe(
      result =>{
        this.submitted = false;
        if(result.icon === 'success'){
          Swal.fire(result);
          this.flagToReaload.emit(true);
          return;
        }
        Swal.fire(result);
      }
    )
  }

}
