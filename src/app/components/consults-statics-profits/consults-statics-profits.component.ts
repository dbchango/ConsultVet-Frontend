import { Component, OnInit } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-consults-statics-profits',
  templateUrl: './consults-statics-profits.component.html',
  styleUrls: ['./consults-statics-profits.component.css']
})
export class ConsultsStaticsProfitsComponent implements OnInit {
  LineChartConsultsProfits: any = [];
  dataConsultsProfits: number[];
  constructor(private consultService: ConsultService) { }

  ngOnInit(): void {
    let index: number;
    this.consultService.list().subscribe(
      res=>{

        this.dataConsultsProfits = [0, 0,0 , 0, 0, 0, 0, 0, 0, 0, 0, 0]
        res.map(result=> {
          index = Number(new Date(result.date).getMonth().toLocaleString())

          this.dataConsultsProfits[index] += result.total;
        })  
        this.consultsProfits(this.dataConsultsProfits)
    
      }
    )
  }

  consultsProfits(dataSet: number[]){
    this.LineChartConsultsProfits = new Chart('lineChart2',{
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Ingresos',
          data: dataSet,
          backgroundColor:
          [
            'rgba(71, 234, 87, 0.2)',
          ]
          
        }]
      },
      options: {
        title:{
          text: 'Ingresos por mes',
          display: true
        },
        scales:{
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }

    }

    )

  }

}
