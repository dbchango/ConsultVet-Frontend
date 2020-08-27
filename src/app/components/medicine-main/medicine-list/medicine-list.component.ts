import { Component, OnInit, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { Medicine } from 'src/app/shared/models/medicine';
import { MedicineService } from 'src/app/core/services/medicine.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {

  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() medicineToEdit = new EventEmitter<Medicine>();

  medicines:Medicine[];
  
  constructor(private medicineService: MedicineService) { }

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

  ngOnChanges(changes: SimpleChanges){
    if(changes.flagToReload.currentValue){
      console.log('Flag changed to: '+this.flagToReload);
      if(this.flagToReload){
        this.list();
      }
    }
  }

  retrieve(medicine: Medicine): void{
    Swal.fire({
      title: `<h4>${medicine.name}</h4>`,
      icon: 'info',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      html: `<hr><fieldset>
          <label>Nombre: </label><span>${medicine.name}</span><br>
          <label>Precio: </label><span>${medicine.price}</span><br>
          <label>Presentación: </label><span>${medicine.presentation}</span><br>
          <label>Descripción: </label><span>${medicine.description}</span><br>
          <label>Composición: </label><span>${medicine.composition}</span><br>
          </fieldset>`,
    })
  }

  delete(medicine: Medicine): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${medicine.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.medicineService.delete(medicine.idmedicine).subscribe(
          result=>{
            Swal.fire(result);
            this.list();
          }
        )
      }
    })
  }

  update(medicine: Medicine): void{
    console.log('Medicine to edit '+medicine.idmedicine);
    this.medicineToEdit.emit(medicine);
  }

}
