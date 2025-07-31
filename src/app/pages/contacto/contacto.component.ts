import { Component } from '@angular/core';
import { ContactoInfoComponent } from "../../components/contactos/contacto-info/contacto-info.component";
import { ContactoFormComponent } from "../../components/contactos/contacto-form/contacto-form.component";
import { ContactoMapaComponent } from "../../components/contactos/contacto-mapa/contacto-mapa.component";
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [ContactoInfoComponent, ContactoFormComponent, ContactoMapaComponent, NavBarComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
