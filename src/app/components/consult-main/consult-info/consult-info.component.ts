import { Component, OnInit, Input } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import { ActivatedRoute } from '@angular/router';
import { Consult } from 'src/app/shared/models/consult';
import { Client } from 'src/app/shared/models/client';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { Pet } from 'src/app/shared/models/pet';


@Component({
  selector: 'app-consult-info',
  templateUrl: './consult-info.component.html',
  styleUrls: ['./consult-info.component.css']
})
export class ConsultInfoComponent implements OnInit {

  constructor(private consultService:ConsultService, private activeRoute:ActivatedRoute) { }
  flagToQuery: Boolean;
  consult = new Consult;
  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{
        if(params['id']){
          this.consult.pet = new Pet();
          this.consult.veterinary = new Veterinary();
          this.consult.pet.client = new Client();
          this.consultService.retrieve(params['id'])
          .subscribe(
            result=>{
              this.consult = result;
              this.consult.idconsult = params['id'];
              console.warn(result)
            }
          )
        }
      }
    )
  }

}
