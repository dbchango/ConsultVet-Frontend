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
  faEdit =faEdit;
  faTrash = faTrash;
  faInfo = faInfo;
  clients : Client[];
  querysize: number = 10;//array length
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  last = '-';

  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() clientToEdit = new EventEmitter<Client>();
  
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.count();
  }

  init():void{
    this.pages = [];
    this.currentPage = 1;
    this.last='-';
  }

  count():void{
    this.clientService.count().subscribe(
      result=>{
        console.log(result);
        this.numberDocs = result.numberDocs;
        this.calcNumberPages();
      }
    )
  }

  changeLimit($event){
    this.limit = $event.target.value;
    this.calcNumberPages();
  }

  loadPage(pg : number){    
    this.currentPage = pg;
    this.clientService.list(pg, this.limit).subscribe(
      result => {this.clients = result      
    }
    )
  }

  calcNumberPages(){
    this.init();
    this.numberPages = Math.floor(this.numberDocs/this.limit);
    this.numberPages++;
    for (let index = 1; index <= this.numberPages; index++) {            
      this.pages.push(index);
    }    
    this.loadPage(this.currentPage);
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.flagToReload.currentValue){
      console.log('Flag changed to: '+this.flagToReload);
      if(this.flagToReload){
        this.loadPage(this.currentPage);
      }
    }
  }

/*
  list(): boolean{
    this.clientService.listInterval(this.querysize, this.last).subscribe(
      result =>{
        console.log(result)
        this.clients = result
        this.reloadComplete.emit(true);
      }
    )
    return true;
  }*/

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
            this.loadPage(this.currentPage);
          }
        )
      }
    })
  }

  update(client: Client): void{
    console.log('Client to edit '+client.idclient);
    this.clientToEdit.emit(client);
  }
/*
  changeSize(): void{
    this.last=0;
    this.list()
  }

  next(){
    if(this.clients.length<this.querysize){
      return;
    }
    this.last = this.last + this.querysize;
    if(this.list()){
      this.actualPage++;
    }
  }
  
  before(){
    if(this.clients.length===0||this.last===0){
      return;
    }
    this.last = this.last - this.querysize;
    if(this.list()){
      this.actualPage--;
    }
    
  }*/

}
