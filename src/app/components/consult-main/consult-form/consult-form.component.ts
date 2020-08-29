import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consult } from 'src/app/shared/models/consult';
import Swal from 'sweetalert2';
import { faQuoteLeft, faIdCard, faVenusMars, faCalendarDay, faPhoneAlt, faDirections, faSave, faBackspace } from '@fortawesome/free-solid-svg-icons'
import { ActivatedRoute } from '@angular/router';
import { Medicine } from '../../../shared/models/medicine'; 
import { Prescription } from 'src/app/shared/models/prescription';
import { VeterinaryService } from 'src/app/core/services/veterinary.service';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { concat } from 'rxjs';

@Component({
  selector: 'app-consult-form',
  templateUrl: './consult-form.component.html',
  styleUrls: ['./consult-form.component.css']
})
export class ConsultFormComponent implements OnInit {
  faSave = faSave;
  faBackspace =faBackspace;
  faQuoteLeft= faQuoteLeft;
  faIdCard = faIdCard;
  faVenusMars = faVenusMars;
  faCalendarDay = faCalendarDay;
  faPhoneAlt = faPhoneAlt;
  faDirections = faDirections;

  formConsult: FormGroup;
  num:number=0;
  veterinaries:Veterinary[];
  @Output() flagToReload = new EventEmitter<Boolean>();
  consult = new Consult();
  submitted = false;
  
  constructor(private vaterinaryService:VeterinaryService, private activatedRoute: ActivatedRoute,private consultService:ConsultService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      params=>{
        if(params['id']){
          console.warn('Update')
          this.consultService.retrieve(params['id'])
          .subscribe(
            result=>{
              
              this.consult = result;
              this.consult.idconsult = params['id'];
              if(result.prescription===undefined){
                this.consult.prescription = [];
              }else{
                this.consult.prescription = result.prescription
              }
              
            }
            
          )
        }else{
          this.consult = new Consult();
        }
        this.consult.idpet = params['pet'];
        this.consult.total = 0;
      }
    );
    
    this.formConsult = this.formBuilder.group({
      idveterinary: ['', [Validators.required]],
      status: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    this.listVeterinaries();

  }

  listVeterinaries(){
    this.vaterinaryService.list().subscribe(
      result=>{
        this.veterinaries = result;
      }
    )
  }

  get f(){
    return this.formConsult.controls;
  }
  onReset(): void{
    this.formConsult.reset();
    this.submitted = false;
  }

  addMedicine($event){
    let prescription = new Prescription();
    prescription.idmedicine = $event.idmedicine;
    prescription.name = $event.name;
    prescription.description = $event.description;
    prescription.price = $event.price
    this.num = this.num+Number(prescription.price);
    
    this.consult.prescription.push(prescription);
    this.calcTotal();
  }

  calcTotal(){
    let a:number = 0;
    this.consult.prescription.forEach(item=>{
      a += Number(item.price)
    })
    this.consult.total = a + this.consult.price
    console.warn(a)
    console.warn(this.consult.total)
  }



  onSubmit(): void{
    this.calcTotal();
    this.submitted = true;
    if(this.formConsult.invalid){
      console.warn("Invalid form")
      return;
    }
    console.warn(this.consult)
    this.consultService.save(this.consult).subscribe(
      result=>{
        console.warn(result)
        this.submitted = false;
        if(result.icon === 'success'){
          Swal.fire(result);
          this.flagToReload.emit(true);
          return;
        }
      }
    )
  }



}
