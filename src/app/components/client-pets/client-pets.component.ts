import { Component, OnInit, Input, Inject, SimpleChange, Output, EventEmitter } from '@angular/core';
import { Pet } from 'src/app/shared/models/pet';
import { PetService } from 'src/app/core/services/pet.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-client-pets',
  templateUrl: './client-pets.component.html',
  styleUrls: ['./client-pets.component.css']
})
export class ClientPetsComponent implements OnInit {
  @Input() flagToQuery: Boolean;
  pets: Pet[];
  @Output() petsout = new EventEmitter<Pet[]>();
  @Input() clientid: string;

  constructor(private petService: PetService, public dialog: MatDialog, private clientService: ClientService) { }

  ngOnInit(): void {
    if(this.flagToQuery===true){
      this.listPets(this.clientid);
    }
  }

  listPets(id: string): void{
    this.clientService.listClientPets(id).subscribe(
      result=>{
        this.pets = result
        this.petsout.emit(this.pets)
        //console.log(result);
      }
    )
  }

  update(pet: Pet): void{
    const dialogRef = this.dialog.open(ClientPetEditDialog, 
      {
        width: '700px', 
        data:  {idpet: pet.idpet, name: pet.name, color: pet.color, age: pet.age, sex: pet.sex, type: pet.type, idclient: pet.idclient, vaccines: pet.vaccines } 
      });
      
      dialogRef.afterClosed().subscribe(
        result=>{
          console.log(result)//undefined por el momento 
          this.listPets(this.clientid);
        }
      )
  }

  create():void{
    let pet = new Pet;
    const dialogRef = this.dialog.open(ClientPetEditDialog, 
      {
        width: '700px', 
        data:  {idpet: pet.idpet,name: pet.name, color: pet.color, age: pet.age, sex: pet.sex, type: pet.type, idclient: this.clientid, vaccines: pet.vaccines } 
      });
      
      dialogRef.afterClosed().subscribe(
        result=>{
          console.log(result)//undefined por el momento 
          this.listPets(this.clientid);
        }
      )
  }

  delete(pet: Pet): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${pet.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result)=>{
      if(result.value){
        this.petService.delete(pet.idpet).subscribe(
          result=>{
            Swal.fire(result);
            this.listPets(this.clientid);
          }
        )
      }
    })
  }
}

@Component({
  selector: 'client-pet-edit-dialog',
  templateUrl: 'client-pet-edit-dialog.html',
  styleUrls: ['./client-pets.component.css']
})
export class ClientPetEditDialog{
  constructor(
    public dialogRef: MatDialogRef<ClientPetEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Pet
    ){}
    @Input() flagToReload: Boolean;
    @Input() flagReset: Boolean;
    ngOnInit(): void {
      
    }
    
    reloadToDo($event){
      this.flagToReload = $event;
      if(this.flagToReload){
        console.log(this.flagToReload)
        this.dialogRef.close();
      }
    } 
}


