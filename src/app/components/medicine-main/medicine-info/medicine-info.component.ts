import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/core/services/medicine.service';
import { ActivatedRoute } from '@angular/router';
import { Medicine } from 'src/app/shared/models/medicine';

@Component({
  selector: 'app-medicine-info',
  templateUrl: './medicine-info.component.html',
  styleUrls: ['./medicine-info.component.css']
})
export class MedicineInfoComponent implements OnInit {
  medicine = new Medicine();
  constructor(private medicineService: MedicineService,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{
        if(params['id']){
        
          this.medicineService.retrieve(params['id'])
          .subscribe(result=> {
            this.medicine = result
          })
        }
      }
    );
  }

}
