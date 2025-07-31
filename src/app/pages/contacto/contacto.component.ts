import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { ContactoInfoComponent } from "../../components/contactos/contacto-info/contacto-info.component";
import { ContactoFormComponent } from "../../components/contactos/contacto-form/contacto-form.component";
import { ContactoMapaComponent } from "../../components/contactos/contacto-mapa/contacto-mapa.component";
import { FooterComponent } from "../../components/general/footer/footer.component";

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [NavBarComponent, ContactoInfoComponent, ContactoFormComponent, ContactoMapaComponent, FooterComponent],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {

}
