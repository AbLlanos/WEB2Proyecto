import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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

}
