import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input} from '@angular/core';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../shared/models/client';
import Swal from 'sweetalert2';
import { faEdit, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {

//  actualPage: number = 1;

  faEdit =faEdit;
  faTrash = faTrash;
  faInfo = faInfo;
  clients : Client[];
  
  querysize = 10;//array length
  last: string;
  pageEvent :Event;



  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() clientToEdit = new EventEmitter<Client>();
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.list();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.flagToReload.currentValue){
      console.log('Flag changed to: '+this.flagToReload);
      if(this.flagToReload){
        this.list();
      }
    }
  }
/*
  list(): void{
    this.clientService.list().subscribe(
      result=>{
        this.clients = result;
        this.reloadComplete.emit(true);
        this.total = this.clients.length;
      }
    )
  }*/

  list(): void{
    this.clientService.listInterval( this.querysize, this.last).subscribe(
      result =>{
        console.log(result)
        this.clients = result
        this.reloadComplete.emit(true);
        this.querysize = result.length
      }
    )
  }

  retrieve(client: Client): void{
    Swal.fire({
      title: `<h4>${client.name}</h4>`,
      icon: 'info',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      html: `<hr><fieldset>
          <label>Nombre: </label><span>${client.name}</span><br>
          <label>Apellido: </label><span>${client.lastname}</span><br>
          <label>Cedula: </label><span>${client.ci}</span><br>
          <label>Teléfono: </label><span>${client.phone}</span><br>
          <labeL>Fecha de nacimiento: </label><span>${client.borndate}</span><br>
          <label>Direccion: </label><span>${client.direction}</span><br>
          <label>Genero: </label><span>${client.gender}</span><br>
          </fieldset>`,

    })

  }
  
  delete(client: Client): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${client.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.clientService.delete(client.idclient).subscribe(
          result=>{
            Swal.fire(result);
            this.list();
          }
        )
      }
    })
  }

  update(client: Client): void{
    console.log('Client to edit '+client.idclient);
    this.clientToEdit.emit(client);
  }

  catchEvent($event): void{
    this.pageEvent = $event; 
    console.log(this.pageEvent)
    console.log(this.querysize);
  }

  changeSize(): void{
    console.log("Tamano: "+this.querysize+"Posicion inicial: "+this.last)
    this.list()
  }

}
