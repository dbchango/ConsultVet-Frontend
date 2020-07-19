import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMainComponent } from './client-main/client-main.component';
import { PetMainComponent } from './pet-main/pet-main.component';


const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'client', component: ClientMainComponent},
  {path: 'pet', component: PetMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
