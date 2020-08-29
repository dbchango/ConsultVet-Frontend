import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { PetService } from 'src/app/core/services/pet.service';
import { ConsultService } from 'src/app/core/services/consult.service';
import { Consult } from 'src/app/shared/models/consult';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-consults',
  templateUrl: './edit-consults.component.html',
  styleUrls: ['./edit-consults.component.css']
})
export class EditConsultsComponent implements OnInit {
  @Input() idpet: string;
  @Input() flagToQuery: Boolean;
  consults: Consult[];
  constructor(private petService: PetService, private consultService: ConsultService) { }

  ngOnInit(): void {
    if(this.flagToQuery===true){
      this.listConsults(this.idpet);
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.flagToQuery.currentValue)
    if(this.flagToQuery){
      this.list();
    }
  }

  listConsults(id: string): void{
    this.petService.listConsults(id).subscribe(
      result=>{
        this.consults = result;
        this.flagToQuery = false;
      }
    )
  }
  list(){
    this.listConsults(this.idpet);
  }

  delete(consult: Consult): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${consult.pet.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.value){
        this.consultService.delete(consult.idconsult).subscribe(
          result=>{
            Swal.fire(result);
          }
        )
      }
    })
  }
}

