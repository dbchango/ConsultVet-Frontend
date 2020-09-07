import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vaccine } from 'src/app/shared/models/vaccine';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.css']
})
export class VaccineFormComponent implements OnInit {

  submitted = false;
  form:FormGroup;
  @Input() vaccine: Vaccine;
  @Input() title: string
  @Output() flagToReload = new EventEmitter<Boolean>();
  constructor(private vaccineService: VaccineService, private formBuilder: FormBuilder, private activetedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      brand: ['', [Validators.required]],
    })
    this.authService.getToken();
  };
  
  get f(){
    return this.form.controls;
  }

  onReset():void{
    this.form.reset();
    this.submitted = false;
  }

  onSubmit(): void{
    this.submitted = true;
    if(this.form.invalid){
      console.warn('Invalid form');
      return
    }
    this.vaccineService.save(this.vaccine, this.authService.userToken).subscribe(
      result=>{
        this.submitted = false;
        if(result.icon==='success'){
          Swal.fire(result);
          this.flagToReload.emit(true);
          return;
        }
      }
    )
  }

}
