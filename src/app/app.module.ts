import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';

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
//Estilos
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSliderModule } from '@angular/material/slider'
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule} from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import { MatButtonModule} from '@angular/material/button';
import { MatListModule} from '@angular/material/list';
import { ConsultMainComponent } from './components/consult-main/consult-main.component';
import { ConsultFormComponent } from './components/consult-main/consult-form/consult-form.component';
import { ConsultListComponent } from './components/consult-main/consult-list/consult-list.component';
import { ServiceInterceptor } from './core/interceptors/service.interceptor';
import { PetInfoComponent } from './components/pet-main/pet-info/pet-info.component';


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
    PetInfoComponent
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
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
      
  ],
  providers: [
    ClientService,
    PetService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {provide: HTTP_INTERCEPTORS,
      useClass: ServiceInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
