import { Component, OnInit } from '@angular/core';
import { ConsultService } from 'src/app/core/services/consult.service';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';

@Component({
  selector: 'app-consults-statics',
  templateUrl: './consults-statics.component.html',
  styleUrls: ['./consults-statics.component.css']
})
export class ConsultsStaticsComponent implements OnInit {
  LineChartConsultsQunatity: any = [];
  LineChartConsultsProfits: any = [];
  dataConsultsProfits: number[];
  dataConsultsQuantity: number[];

  constructor(private consultService: ConsultService) { }
  PieChart: any=[];
  ngOnInit(): void {
    
    let index: number;
    this.consultService.list().subscribe(
      res=>{
        this.dataConsultsQuantity= [0, 0,0 , 0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.dataConsultsProfits = [0, 0,0 , 0, 0, 0, 0, 0, 0, 0, 0, 0]
        res.map(result=> {
          index = Number(new Date(result.date).getMonth().toLocaleString())
          this.dataConsultsQuantity[index]  +=1;
          this.dataConsultsProfits[index] += result.total;
        })  
        this.consultQuantity(this.dataConsultsQuantity)
        this.consultsProfits(this.dataConsultsProfits)
      }
    )
  };

  consultQuantity(dataSet: number[]){
    this.LineChartConsultsQunatity = new Chart('lineChart',{
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Consultas',
          data: dataSet,
          backgroundColor:
          [
            'rgba(229, 229, 86, 0.2)',
          ]
          
        }]
      },
      options: {
        title:{
          text: 'Consultas por mes',
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
