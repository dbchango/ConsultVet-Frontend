import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetMainComponent } from './pet-main/pet-main.component';
//Componentes
import { ClientMainComponent } from './client-main/client-main.component';
import { ClientFormComponent } from './client-main/client-form/client-form.component';
import { ClientListComponent } from './client-main/client-list/client-list.component';
import { ClientService } from './client-main/model/client.service'
import { PetService } from './pet-main/model/pet.service';
import { PetFormComponent } from './pet-main/pet-form/pet-form.component';
import { PetListComponent } from './pet-main/pet-list/pet-list.component';
//Estilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider'
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    PetMainComponent,
    ClientMainComponent,
    ClientFormComponent,
    ClientListComponent,
    PetFormComponent,
    PetListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule
    
    
  ],
  providers: [
    ClientService,
    PetService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
