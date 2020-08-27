import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { VeterinaryService } from 'src/app/core/services/veterinary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-veterinary-list',
  templateUrl: './veterinary-list.component.html',
  styleUrls: ['./veterinary-list.component.css']
})
export class VeterinaryListComponent implements OnInit {

  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() veterinaryToEdit = new EventEmitter<Veterinary>();

  veterinaries: Veterinary[];

  constructor(private veterinaryService: VeterinaryService) { }

  ngOnInit(): void {
    this.list();
  }

  list():void {
    this.veterinaryService.list().subscribe(
      result=>{
        this.veterinaries = result;
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
  retrieve(veterinary: Veterinary): void{
    Swal.fire({
      title: `<h4>${veterinary.name}</h4>`,
      icon: 'info',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      html: `<hr><fieldset>
          <label>Nombre: </label><span>${veterinary.name}</span><br>
          <label>Apellido: </label><span>${veterinary.lastname}</span><br>
          <label>Cedula: </label><span>${veterinary.ci}</span><br>
          <label>Teléfono: </label><span>${veterinary.phone}</span><br>
          <labeL>Fecha de nacimiento: </label><span>${veterinary.borndate}</span><br>
          <label>Direccion: </label><span>${veterinary.direction}</span><br>
          <label>Genero: </label><span>${veterinary.gender}</span><br>
          </fieldset>`,
    })
  }
  
  delete(veterinary: Veterinary): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${veterinary.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.veterinaryService.delete(veterinary.idveterinary).subscribe(
          result=>{
            Swal.fire(result);
            this.list();
          }
        )
      }
    })
  }

  update(veterinary: Veterinary): void{
    console.log('Veterinary to edit '+veterinary.idveterinary);
    this.veterinaryToEdit.emit(veterinary);
  }
}
