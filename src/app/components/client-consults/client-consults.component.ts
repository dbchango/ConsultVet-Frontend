import { Component, OnInit, Input, Inject } from '@angular/core';
import { Consult } from 'src/app/shared/models/consult';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClientService } from 'src/app/core/services/client.service';
import { ConsultService } from 'src/app/core/services/consult.service';
import { Pet } from 'src/app/shared/models/pet';
@Component({
  selector: 'app-client-consults',
  templateUrl: './client-consults.component.html',
  styleUrls: ['./client-consults.component.css']
})
export class ClientConsultsComponent implements OnInit {
  //@Input() pets: Pet[];
  @Input() clientid: string;
  @Input() flagToQuery: Boolean;
  consults: Consult[];

  constructor(private clientService: ClientService, private consultService: ConsultService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.flagToQuery===true){
      this.listConsults(this.clientid);
    }
  }

  listConsults(id: string): void{
    this.clientService.listConsults(id).subscribe(
      result=>{
        this.consults = result;
      }
    )
  }

  list(){
    this.listConsults(this.clientid);
  }

  update(consult: Consult):void{
    const dialogRef = this.dialog.open(ClientConsultsEditDialog,
      {
        width: "800",
        data: {idconsult: consult.idconsult,
                date: consult.date,
                observation: consult.observation,
                price: consult.price,
                responsable: consult.responsable,
                status: consult.status,
                idpet: consult.idpet,
                idclient: consult.idclient,
                pet: consult.pet,
                client: consult.client
              }
      })
      dialogRef.afterClosed().subscribe(
        result=>{
          console.log(result)//undefined por el momento 
        }
      )
  }

  create():void{
    let consult = new Consult;
    const dialogRef = this.dialog.open(ClientConsultsEditDialog,
      {
        width: '700px',
        data: {idconsult: consult.idconsult,
              date: consult.date,
              observation: consult.observation,
              price:  consult.price,
              responsable: consult.responsable,
              status: consult.status,
              idclient: this.clientid,
       
        }
      })
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

@Component({
  selector: 'client-pet-edit-dialog',
  templateUrl: 'client-consults-edit-dialog.html',
  styleUrls: ['./client-consults.component.css']
})
export class ClientConsultsEditDialog{
  constructor(
    public dialogRef: MatDialogRef<ClientConsultsEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Consult
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

