import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/core/services/pet.service';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-types-statics',
  templateUrl: './pet-types-statics.component.html',
  styleUrls: ['./pet-types-statics.component.css']
})
export class PetTypesStaticsComponent implements OnInit {

  constructor(private petSetvice: PetService, private authService: AuthService, private router: Router) { }

  PieChart: any=[];
 
  ngOnInit(): void {
    
    if(this.authService.userToken===undefined){
      this.router.navigate(['/login'])
    }
    
    const datos: number[] =[];
    this.petSetvice.countPetTypes().subscribe(
      res=>{
        datos.push( res.numberDogs, res.numberCats, res.numberPericos, res.numbeQuindes, res.numbeTortugas,  res.numberHamsters, res.numbeGolondrina ,res.numberOthers )
        this.createChart(datos)
      }
    )

    // Line chart:
         
  }


  createChart(data: number[]){
    this.PieChart = new Chart('pieChart', {
      type: 'doughnut',
    data: {
     labels: ["Perro", "Gato", "Perico", "Quinde", "Tortuga", "Hamster", "Golondrina", "Otros"],
     datasets: [{
         label: '# of pets',
         data: data,
         backgroundColor: [
             'rgba(255, 99, 132, 0.2)',
             'rgba(54, 162, 235, 0.2)',
             'rgba(255, 206, 86, 0.2)',
             'rgba(75, 192, 192, 0.2)',
             'rgb(230, 230, 290, 0.2)',
             'rgb(123, 100, 200, 0.2)',
             'rgb(255, 228, 225, 0.2)',
             'rgb(0, 255, 127, 0.2)',
             'rgb(154, 205, 50)'
            
         ],
         borderColor: [
             'rgba(255,99,132,1)',
             'rgba(54, 162, 200, 1)',
             'rgba(255, 206, 86, 1)',
             'rgba(75, 192, 192, 1)',
             'rgb(230, 230, 290, 1)',
             'rgb(123, 104, 150. 1)',
             'rgb(255, 228, 205, 1)',
             'rgb(100, 255, 100, 1)',
             'rgb(154, 205, 40)'
         ],
         borderWidth: 1
     }]
    }, 
    options: {
     title:{
         text:"Tipos de mascotas",
         display:true
     },
     scales: {
         yAxes: [{
             ticks: {
                 beginAtZero:true
             }
         }]
     }
    }
    });
    
  }

 
  

  

}
