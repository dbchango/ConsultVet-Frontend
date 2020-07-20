import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../shared/models/client';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { faQuoteLeft, faIdCard, faVenusMars, faCalendarDay, faPhoneAlt, faDirections, faSave, faBackspace } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  faSave = faSave;
  faBackspace =faBackspace;
  faQuoteLeft= faQuoteLeft;
  faIdCard = faIdCard;
  faVenusMars = faVenusMars;
  faCalendarDay = faCalendarDay;
  faPhoneAlt = faPhoneAlt;
  faDirections = faDirections;
  

  formClient: FormGroup;
  @Input() client: Client;//Cliente enviado desde el padre-actualizacion del registro
  @Input() title: String;//Titulo enviado desde el padre-actualizacion del registro
  @Output() flagToReload = new EventEmitter<Boolean>();//Bandera de estado del formulario que se enviara al padre
  submitted = false;//indica si el registro se proceso con exito
  constructor(private clientService: ClientService, private formBuilder: FormBuilder) { }

  

  ngOnInit(): void {
    this.formClient = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      ci: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.maxLength(10)]],
      borndate: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
  }

  get f(){
    return this.formClient.controls;
  }

  onReset(): void{
    this.formClient.reset();
    this.submitted = false;
  }

  onSubmit(): void{
    
    this.submitted = true;
    if(this.formClient.invalid){
      console.log('Invalid Form');
      return;
    }
    
    this.clientService.save(this.client).subscribe(
      result=>{
        console.log(result);
        this.submitted = false;
        console.log(this.formClient);
        if(result.icon === "success"){
          
          Swal.fire(result);
          this.flagToReload.emit(true);
          return;
        }
        Swal.fire(result);
      }
      
    )
    
  }
}
