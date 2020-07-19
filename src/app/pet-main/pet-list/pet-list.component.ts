import { Component, OnInit, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { PetService } from '../model/pet.service';
import { Pet } from '../model/pet';
import { faEdit, faEraser, faInfo } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  faEdit = faEdit;
  faEraser = faEraser;
  faInfo = faInfo;

  pets : Pet[];

  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() petToEdit = new EventEmitter<Pet>();

  constructor(private petService:PetService) { }

  ngOnInit(): void {
    this.list();
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.flagToReload.currentValue){
      console.log('Flag to reload changed to: '+this.flagToReload);
      if(this.flagToReload){
        this.list();
      }
    }
  }

  list(): void{
    this.petService.list().subscribe(
      result=>{
        this.pets = result;
        this.reloadComplete.emit(true);
      }
    )
  }

  retrieve(pet: Pet):void{
    Swal.fire({
      title: `<h4>${pet.name}</h4>`,
      icon: 'info',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      html: `<hr><fieldset>
          <label>Nombre: </label><span>${pet.name}</span><br>
          <label>Color: </label><span>${pet.color}</span><br>
          <label>Sex: </label><span>${pet.sex}</span><br>
          <labeL>Edad: </label><span>${pet.age}</span><br>
          <label>Tipo: </label><span>${pet.type}</span><br>
          <label>Dueño: </label><span>${pet.idclient}</span><br>
          </fieldset>`,

    })
  }

  delete(pet:Pet):void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${pet.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.petService.delete(pet.idpet).subscribe(
          result=>{
            Swal.fire(result);
            this.list();
          }
        )
      }
    })
  }

  update(pet: Pet):void{
    console.log('Pet to edit: '+pet.idpet);
    this.petToEdit.emit(pet);
  }

}
