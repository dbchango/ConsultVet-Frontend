import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form : FormGroup
  ngOnInit(): void {
    //formBuilder
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        displayName: ['', [Validators.required, Validators.maxLength(12)]],
        password: ['', [Validators.required]],
        role: ['student', [Validators.required]]
      }
    )
  }

  onSubmit():void{
    if(this.form.invalid){
        return
    }
  }

  onReset(){
    this.form.reset();
  }

  get f(){
    return this.form.controls;
  }


}
