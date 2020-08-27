import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MedicineService } from 'src/app/core/services/medicine.service';
import { Medicine } from 'src/app/shared/models/medicine';
@Component({
  selector: 'app-medicine-query',
  templateUrl: './medicine-query.component.html',
  styleUrls: ['./medicine-query.component.css']
})
export class MedicineQueryComponent implements OnInit {

  constructor(private medicineService: MedicineService) { }
  medicines :Medicine[];
  @Output() medicineAdded = new EventEmitter<Medicine>();
  ngOnInit(): void {
    this.list();
  }
  list():void {
    this.medicineService.list().subscribe(
      result=>{
        this.medicines = result;
      }
    )
  }

  addMedicine(medicine: Medicine){
    this.medicineAdded.emit(medicine);
  }

}
