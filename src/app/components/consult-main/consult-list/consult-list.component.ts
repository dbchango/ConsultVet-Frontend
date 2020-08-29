import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import { Consult } from 'src/app/shared/models/consult';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consult-list',
  templateUrl: './consult-list.component.html',
  styleUrls: ['./consult-list.component.css']
})
export class ConsultListComponent implements OnInit {

  consults : Consult[];
  numberPages : number;
  numberDocs : number;  
  limit : number = 10;   
  currentPage : number = 1;
  pages : Array<number> = [];
  last = '-';

  @Input() flagToReload = new Boolean;
  @Output() reloadComplete = new EventEmitter<Boolean>();
  @Output() consultToEdit = new EventEmitter<Consult>();
  

  constructor(private consultService: ConsultService) { }

  ngOnInit(): void {
    //this.list();
    this.count();
  }
/*
  ngOnChanges(changes: SimpleChanges){
    if(changes.flagToReload.currentValue){
      console.log('Flag changed to: '+this.flagToReload);
      if(this.flagToReload){
        this.list();
      }
    }
  }
  */
/*
  list(): boolean{
    this.consultService.list().subscribe(
      result=>{
        this.consults = result;
        console.warn(result)
      }
      
    )
    return true;
  }*/


  
  delete(consult: Consult): void{
    Swal.fire({
      title: '¿Está seguro?',
      text: `Va a eliminar el registro de ${consult.idconsult}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.consultService.delete(consult.idconsult).subscribe(
          result=>{
            Swal.fire(result);
            //this.list();
            this.loadPage(this.currentPage);
          }
        )
      }
    })
  }

  update(consult: Consult): void{
    console.log('Client to edit '+consult.idconsult);
    this.consultToEdit.emit(consult);
  }

  init():void{
    this.pages = [];
    this.currentPage = 1;
    this.last='-';
  }

  count():void{
    this.consultService.count().subscribe(
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
    this.consultService.listPage(pg, this.limit).subscribe(
      result => {this.consults = result      
        
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


}
