import { Component } from '@angular/core';
import { faPaw } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faPaw = faPaw;
  title = 'Consultorio Veterinario';
}
