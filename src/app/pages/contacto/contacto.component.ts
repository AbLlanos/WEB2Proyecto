import { Component } from '@angular/core';
import { ContactoInfoComponent } from "../../components/contactos/contacto-info/contacto-info.component";
import { ContactoFormComponent } from "../../components/contactos/contacto-form/contacto-form.component";
import { ContactoMapaComponent } from "../../components/contactos/contacto-mapa/contacto-mapa.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ContactoInfoComponent, ContactoFormComponent, ContactoMapaComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
