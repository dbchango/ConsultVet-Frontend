import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PetService } from '../model/pet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pet } from '../model/pet';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {

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
