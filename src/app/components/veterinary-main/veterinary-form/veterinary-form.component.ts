import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { VeterinaryService } from 'src/app/core/services/veterinary.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-veterinary-form',
  templateUrl: './veterinary-form.component.html',
  styleUrls: ['./veterinary-form.component.css']
})
export class VeterinaryFormComponent implements OnInit {
  form: FormGroup;
  @Input() veterinary :Veterinary;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<Boolean>();
  submitted = false;
  constructor(private authService: AuthService,private veterinaryService: VeterinaryService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      ci: ['', [Validators.required, Validators.maxLength(10)]],
      phone: ['', [Validators.maxLength(10)]],
      borndate: ['', [Validators.required]],
      direction: ['', [Validators.required]],
      degree: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    });
    this.authService.getToken();
  }

  get f(){
    return this.form.controls;
  }

  onReset():void{
    this.form.reset();
    this.submitted = false;
  }

  onSubmit():void{
    this.submitted = true;
    if(this.form.invalid){
      console.warn('Invalid Form');
      return;
    }

    this.veterinaryService.save(this.veterinary, this.authService.userToken).subscribe(
      result=>{
        this.submitted = false;
        if(result.icon === "success"){
          Swal.fire(result);
          this.flagToReload.emit(true);
          return;
        }
      }
    )
  }

}
