import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMainComponent } from './components/client-main/client-main.component';
import { PetMainComponent } from './components/pet-main/pet-main.component';
import { PetListComponent } from './components/pet-main/pet-list/pet-list.component';
import { ClientInfoComponent } from './components/client-main/client-info/client-info.component';
import { PetInfoComponent } from './components/pet-main/pet-info/pet-info.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'client', component: ClientMainComponent},
  {path: 'pet', component: PetMainComponent},
  {path: 'petlist', component: PetListComponent},
  {path: 'client/:id', component: ClientInfoComponent},  
  {path: 'pet/:id', component: PetInfoComponent},  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
