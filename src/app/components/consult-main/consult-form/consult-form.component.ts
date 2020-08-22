import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consult } from 'src/app/shared/models/consult';
import Swal from 'sweetalert2';
import { faQuoteLeft, faIdCard, faVenusMars, faCalendarDay, faPhoneAlt, faDirections, faSave, faBackspace } from '@fortawesome/free-solid-svg-icons'

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

  @Input() consult:Consult;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<Boolean>();
  submitted = false;
  constructor(private consultService:ConsultService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formConsult = this.formBuilder.group({
      observation: [''],
      price: ['', [Validators.required, Validators.min(0)]],
      responsable: ['', [Validators.required]],
      status: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
  }


  get f(){
    return this.formConsult.controls;
  }
  onReset(): void{
    this.formConsult.reset();
    this.submitted = false;
  }
  onSubmit(): void{
    this.submitted = true;
    if(this.formConsult.invalid){
      console.warn("forma invalida")
      return;
    }
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
