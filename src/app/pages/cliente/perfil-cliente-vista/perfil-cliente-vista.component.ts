import { Component } from '@angular/core';
import { NavBarClienteComponent } from "../../../components/cliente/nav-bar-cliente/nav-bar-cliente.component";
import { PerfilClienteComponent } from "../../../components/cliente/perfil-cliente/perfil-cliente.component";
import { NavBarComponent } from "../../../components/general/nav-bar/nav-bar.component";

@Component({
  selector: 'app-perfil-cliente-vista',
  standalone: true,
  imports: [ PerfilClienteComponent, NavBarComponent],
  templateUrl: './perfil-cliente-vista.component.html',
  styleUrl: './perfil-cliente-vista.component.css'
})
export class PerfilClienteVistaComponent {

}
