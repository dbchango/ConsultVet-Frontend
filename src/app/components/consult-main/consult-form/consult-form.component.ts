import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Consult } from 'src/app/shared/models/consult';


@Component({
  selector: 'app-consult-form',
  templateUrl: './consult-form.component.html',
  styleUrls: ['./consult-form.component.css']
})
export class ConsultFormComponent implements OnInit {

  constructor(private consultService: ConsultService, private formBuilder: FormBuilder) { }
  formConsult: FormGroup;
  @Input() consult : Consult;
  @Output() flagToReaload = new EventEmitter<Boolean>();
  @Output() flagReset = new EventEmitter<Boolean>();

  submitted = false;
  ngOnInit(): void {
    this.formConsult = this.formBuilder.group({
      date: ['', [Validators.required]],
      observation: ['', []],
      price: ['', [Validators.required, Validators.min(0), Validators]],
      responsable: ['', [Validators.required]],
      status: ['', [Validators.required]],
    })
  }

}
