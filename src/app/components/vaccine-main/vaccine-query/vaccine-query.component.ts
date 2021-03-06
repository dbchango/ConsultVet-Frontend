import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vaccine } from 'src/app/shared/models/vaccine';
import { VaccineService } from 'src/app/core/services/vaccine.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-vaccine-query',
  templateUrl: './vaccine-query.component.html',
  styleUrls: ['./vaccine-query.component.css']
})
export class VaccineQueryComponent implements OnInit {

  vaccines: Vaccine[];
  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() vaccineToEdit = new EventEmitter<Vaccine>();
  constructor(private vaccineServices: VaccineService) { }

  ngOnInit(): void {
    this.list();
  }

  list(){
    this.vaccineServices.list().subscribe(
      result=>{
        this.vaccines = result;
      }
    )
  }

  update(vaccine: Vaccine):void{
    console.log('Vaccine to edit '+vaccine.name);
    this.vaccineToEdit.emit(vaccine);
  }

  delete(vaccine: Vaccine):void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${vaccine.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.vaccineServices.delete(vaccine.idvaccine).subscribe(
          result=>{
            Swal.fire(result);
            this.list();
          }
        )
      }
    })
  }



}
