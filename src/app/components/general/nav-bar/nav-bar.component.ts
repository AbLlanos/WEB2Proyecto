import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onUserClick() {
    // Aquí puedes agregar la lógica para el botón de usuario
    console.log('Usuario clickeó el botón de perfil/roles');
    // Por ejemplo, abrir un modal o navegar a una página de perfil
  }


  //Fuuncionalidad
  constructor(public authServicio: AutenticacionService, private router: Router) { }

  get logueado(): boolean {
    return this.authServicio.sessionIniciada();
  }

  logOut(): void {
    this.authServicio.logOut();
    this.router.navigate(['/login']);
  }


}


