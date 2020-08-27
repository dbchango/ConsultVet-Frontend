import { Component, OnInit, Input } from '@angular/core';
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
  clientid: string;
  flagToQuery: Boolean;
  @Input() pets:Pet[];

  constructor(private clientService: ClientService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{
        if(params['id']){
          this.flagToQuery = true;
          this.clientid = params['id'];
          this.clientService.retrieve(params['id'])
          .subscribe(result=> {
            this.client = result;
            this.client.idclient = params['id'];
          })
        }
      }
    );
  }

  getPets($event){
    this.pets = $event
  }

}
