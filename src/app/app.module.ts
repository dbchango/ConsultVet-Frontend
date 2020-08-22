import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetMainComponent } from './components/pet-main/pet-main.component';
//Componentes
import { ClientMainComponent } from './components/client-main/client-main.component';
import { ClientFormComponent } from './components/client-main/client-form/client-form.component';
import { ClientListComponent } from './components/client-main/client-list/client-list.component';
import { ClientService } from './core/services/client.service'
import { PetService } from './core/services/pet.service';
import { PetFormComponent } from './components/pet-main/pet-form/pet-form.component';
import { PetListComponent } from './components/pet-main/pet-list/pet-list.component';
import { ConsultMainComponent } from './components/consult-main/consult-main.component';
import { ConsultFormComponent } from './components/consult-main/consult-form/consult-form.component';
import { ConsultListComponent } from './components/consult-main/consult-list/consult-list.component';
import { ServiceInterceptor } from './core/interceptors/service.interceptor';
import { PetInfoComponent } from './components/pet-main/pet-info/pet-info.component';
import {MaterialModule } from './material.module'
//Estilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { ClientInfoComponent } from './components/client-main/client-info/client-info.component';
import { ClientPetsComponent, ClientPetEditDialog } from './components/client-pets/client-pets.component';
import { ClientConsultsComponent, ClientConsultsEditDialog } from './components/client-consults/client-consults.component';
import { PetVaccinesComponent } from './components/pet-main/pet-info/pet-vaccines/pet-vaccines.component';
import { ConsultService } from './core/services/consult.service';
import { ConsultInfoComponent } from './components/consult-main/consult-info/consult-info.component';
import { ScheduleConsultComponent } from './components/schedule-consult/schedule-consult.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form/sign-up-form.component'

@NgModule({
  declarations: [
    AppComponent,
    PetMainComponent,
    ClientMainComponent,
    ClientFormComponent,
    ClientListComponent,
    PetFormComponent,
    PetListComponent,
    ConsultMainComponent,
    ConsultFormComponent,
    ConsultListComponent,
    PetInfoComponent,
    ClientInfoComponent,
    ClientPetsComponent,
    ClientPetEditDialog,
    ClientConsultsComponent,
    PetVaccinesComponent,
    ConsultInfoComponent,
    ScheduleConsultComponent,
    ClientConsultsEditDialog,
    SignUpFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule

  ],
  providers: [
    ClientService,
    PetService,
    ConsultService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor, 
      multi: true
    },
    {
      provide: LOCALE_ID, 
      useValue: 0
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
