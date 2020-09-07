import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMainComponent } from './components/client-main/client-main.component';
import { PetMainComponent } from './components/pet-main/pet-main.component';
import { PetListComponent } from './components/pet-main/pet-list/pet-list.component';
import { ClientInfoComponent } from './components/client-main/client-info/client-info.component';
import { PetInfoComponent } from './components/pet-main/pet-info/pet-info.component';
import { ConsultInfoComponent } from './components/consult-main/consult-info/consult-info.component';
import { ScheduleConsultComponent } from './components/schedule-consult/schedule-consult.component';
import { ConsultListComponent } from './components/consult-main/consult-list/consult-list.component';
import { ConsultFormComponent } from './components/consult-main/consult-form/consult-form.component';
import { ConsultMainComponent } from './components/consult-main/consult-main.component';
import { PetFormComponent } from './components/pet-main/pet-form/pet-form.component';
import { VaccineMainComponent } from './components/vaccine-main/vaccine-main.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form/sign-up-form.component';
import { VeterinaryMainComponent } from './components/veterinary-main/veterinary-main.component';
import { VeterinaryInfoComponent } from './components/veterinary-main/veterinary-info/veterinary-info.component';
import { MedicineMainComponent } from './components/medicine-main/medicine-main.component';
import { VeterinaryConsultComponent } from './components/veterinary-consult/veterinary-consult.component';
import { ServePetComponent } from './components/serve-pet/serve-pet.component';
import { PetTypesStaticsComponent } from './components/pet-types-statics/pet-types-statics.component';
import { ConsultsStaticsComponent } from './components/consults-statics/consults-statics.component';
import { ConsultsStaticsProfitsComponent } from './components/consults-statics-profits/consults-statics-profits.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '', component: MainComponent},
  {path: 'client', component: ClientMainComponent},
  {path: 'pet', component: PetMainComponent},
  {path: 'vaccines', component: VaccineMainComponent},
  {path: 'petlist', component: PetListComponent},
  {path: 'client/:id', component: ClientInfoComponent},  
  {path: 'pet/info/:id', component: PetInfoComponent},  
  {path: 'consult/info/:id', component:ConsultInfoComponent},
  {path: 'schedule', component: ScheduleConsultComponent},
  {path: 'consult/list', component: ConsultListComponent},
  {path: 'consult/:pet/form/:id', component:ConsultFormComponent},
  {path: 'consult/:pet/form', component:ConsultFormComponent},
  {path: 'consultmain', component: ConsultMainComponent},
  {path: 'pet/form/:id', component: PetFormComponent},
  {path: 'veterinary', component: VeterinaryMainComponent},
  {path: 'veterinary/info/:id', component: VeterinaryInfoComponent},
  {path: 'veterinary/info', component: VeterinaryInfoComponent},
  {path: 'medicines', component: MedicineMainComponent},
  {path: 'signup', component: SignUpFormComponent},
  {path: 'consults', component: ConsultListComponent},
  {path: 'veterinary/consults/:id', component: VeterinaryConsultComponent},
  {path: 'serve/pet/:id', component: ServePetComponent},
  {path: 'pet/types/statics', component: PetTypesStaticsComponent},
  {path: 'test/consult/statics', component: ConsultsStaticsComponent},
  {path: 'test/consult/profits', component: ConsultsStaticsProfitsComponent},
  {path: 'login', component: LoginFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
