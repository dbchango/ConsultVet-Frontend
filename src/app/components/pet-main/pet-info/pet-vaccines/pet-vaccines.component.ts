import { Component, OnInit, Input } from '@angular/core';
import { Vaccine } from 'src/app/shared/models/vaccine';

@Component({
  selector: 'app-pet-vaccines',
  templateUrl: './pet-vaccines.component.html',
  styleUrls: ['./pet-vaccines.component.css']
})
export class PetVaccinesComponent implements OnInit {

  @Input() vaccines: Vaccine[];
  
  constructor() { }

  ngOnInit(): void {
  }

  

}
