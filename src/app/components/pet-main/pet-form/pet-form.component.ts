import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetService } from '../../../core/services/pet.service';
import { Pet } from '../../../shared/models/pet';
import Swal from 'sweetalert2';
import { faQuoteLeft, faIdCard, faVenusMars, faCalendarDay,   faSave, faBackspace, faDog } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute } from '@angular/router';
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
  //@Input() pet : Pet;
  pet = new Pet;
  @Input() idclient:string;
  @Input() title: string;
  @Output() flagToReaload = new EventEmitter<Boolean>();
  @Output() flagReset = new EventEmitter<Boolean>();

  constructor(private petService : PetService, private formBuilder: FormBuilder, private activeRoute: ActivatedRoute) { }


  ngOnInit(): void {
    console.warn(this.idclient);
    console.warn(this.pet.vaccines = []);
    if(this.idclient===undefined){
      this.activeRoute.params.subscribe(
        params=>{
          console.warn(params['id'])
          if(params['id']){
            this.petService.retrieve(params['id'])
            .subscribe(result=> {
              this.pet = result
              this.pet.idpet = params['id'];
              console.warn(this.pet);
            })
          }
          else{
            this.pet = new Pet();
          }
        }
      );
    }else{
      this.pet = new Pet();
      this.pet.idclient = this.idclient;
    }
    
    this.formPet = this.formBuilder.group({
      name: ['', [Validators.required]],
      sex: ['', [Validators.required]],
      type: ['', [Validators.required]],
      age: ['', []],
      color: ['', []]
    })
  }

  get f(){
    return this.formPet.controls;
  }

  onReset():void{
    this.submitted = false;
    this.formPet.reset();
    this.flagReset.emit(true);
  }

  onSubmit(): void{
    this.submitted=true;
    console.warn(this.pet);
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
