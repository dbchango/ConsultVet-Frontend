import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client';
import { ClientService } from '../../../core/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/shared/models/pet';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  client = new Client;
  pets : Pet[];
  

  constructor(private clientService: ClientService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{
        if(params['id']){
          this.clientService.retrieve(params['id'])
          .subscribe(result=> {
            this.client = result
            this.listPets(this.client.idclient);
          })
          
        }
      }
    );
  }

  listPets(id: string): void{
    this.clientService.listClientPets(id).subscribe(
      result=>{
        this.pets = result
        console.log(result);
      }
    )
  }


}
