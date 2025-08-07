import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [NavBarComponent,RouterLink],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.css'
})
export class PerfilClienteComponent implements OnInit {
  usuario: any = null;

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    if (userString) {
      this.usuario = JSON.parse(userString);
    }
  }
}
