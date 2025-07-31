import { Component } from '@angular/core';
import { NavBarClienteComponent } from "../../../components/cliente/nav-bar-cliente/nav-bar-cliente.component";
import { PerfilClienteComponent } from "../../../components/cliente/perfil-cliente/perfil-cliente.component";

@Component({
  selector: 'app-perfil-cliente-vista',
  standalone: true,
  imports: [NavBarClienteComponent, PerfilClienteComponent],
  templateUrl: './perfil-cliente-vista.component.html',
  styleUrl: './perfil-cliente-vista.component.css'
})
export class PerfilClienteVistaComponent {

}
