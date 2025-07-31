import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FormularioClienteComponent } from "../../components/cliente/formulario-cliente/formulario-cliente.component";
import { FooterComponent } from "../../components/general/footer/footer.component";

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [NavBarComponent, FormularioClienteComponent, FooterComponent],
  templateUrl: './registro-cliente.component.html',
  styleUrl: './registro-cliente.component.css'
})
export class RegistroClienteComponent {

}
