import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Medicine } from 'src/app/shared/models/medicine';
import { MedicineService } from 'src/app/core/services/medicine.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medicine-form',
  templateUrl: './medicine-form.component.html',
  styleUrls: ['./medicine-form.component.css']
})
export class MedicineFormComponent implements OnInit {

  form: FormGroup;
  @Input() medicine :Medicine;
  @Input() title: string;
  @Output() flagToReload = new EventEmitter<Boolean>();
  submitted = false;

  constructor(private medicineService: MedicineService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      presentation: ['', [Validators.required]],
      description: ['', [Validators.required]],
      composition: ['', [Validators.required]]
    });
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

    this.medicineService.save(this.medicine).subscribe(
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
