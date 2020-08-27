import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import { Vaccine } from 'src/app/shared/models/vaccine';

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.css']
})
export class VaccineListComponent implements OnInit {

  constructor(private vaccineService: VaccineService) { }

  vaccines:Vaccine[];
  @Output() vaccineAdded = new EventEmitter<Vaccine>();
  ngOnInit(): void {
    this.vaccineService.list().subscribe(
      result=>{
        this.vaccines = result;
      }
    )
  }

  addVaccine(vaccine: Vaccine){
    this.vaccineAdded.emit(vaccine);
  }

}
