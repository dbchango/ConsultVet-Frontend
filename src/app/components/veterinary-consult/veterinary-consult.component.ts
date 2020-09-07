import { Component, OnInit } from '@angular/core';
import { VeterinaryService } from 'src/app/core/services/veterinary.service';
import { ActivatedRoute } from '@angular/router';
import { ConsultService } from 'src/app/core/services/consult.service';
import { Consult } from 'src/app/shared/models/consult';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { Prescription } from 'src/app/shared/models/prescription';
import Swal from 'sweetalert2';
import { Pet } from 'src/app/shared/models/pet';
import { Client } from 'src/app/shared/models/client';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-veterinary-consult',
  templateUrl: './veterinary-consult.component.html',
  styleUrls: ['./veterinary-consult.component.css']
})
export class VeterinaryConsultComponent implements OnInit {
  consult = new Consult();
  
  veterinaries:Veterinary[];
  submitted = false;
  formConsult: FormGroup;
  constructor(private authService: AuthService ,private vaterinaryService:VeterinaryService, private activatedRoute: ActivatedRoute,private consultService:ConsultService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.consult.pet = new Pet();
    this.consult.pet.client = new Client();
    this.activatedRoute.params.subscribe(
      params=>{
        if(params['id']){
          this.consultService.retrieve(params['id'])
          .subscribe(
            result=>{
              this.consult = result;
              this.consult.idconsult = params['id'];
              this.consult.total = 0;
            }
          )
        }else
        this.consult.price = 0;
      }
    );
    this.formConsult = this.formBuilder.group({
      observation: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      idveterinary: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.listVeterinaries();
    this.authService.getToken();
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
    prescription.price = $event.price;
    this.consult.prescription.push(prescription);
    this.calcTotal();
  }
  onSubmit(): void{
    this.calcTotal();
    this.submitted = true;
    if(this.formConsult.invalid){
      return;
    }
    console.warn(this.consult)
    this.consultService.save(this.consult, this.authService.userToken).subscribe(
      result=>{
        this.submitted = false;
        if(result.icon === 'success'){
          Swal.fire(result);

          return;
        }
      }
    )
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

}
