import { Component, OnInit } from '@angular/core';
import { Veterinary } from 'src/app/shared/models/veterinary';
import { ActivatedRoute } from '@angular/router';
import { VeterinaryService } from 'src/app/core/services/veterinary.service';

@Component({
  selector: 'app-veterinary-info',
  templateUrl: './veterinary-info.component.html',
  styleUrls: ['./veterinary-info.component.css']
})
export class VeterinaryInfoComponent implements OnInit {
  veterinary = new Veterinary();
  //clientid: string;
  //flagToQuery: Boolean;
  constructor(private veterinaryService: VeterinaryService,private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      params=>{
        if(params['id']){
          //this.flagToQuery = true;
          this.veterinaryService.retrieve(params['id'])
          .subscribe(result=> {
            this.veterinary = result
            this.veterinary.idveterinary = params['id'];
          })
        }
      }
    );
  }

}
