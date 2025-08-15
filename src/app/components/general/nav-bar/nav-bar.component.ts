import { ChangeDetectorRef, Component } from '@angular/core';
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

  constructor(public authServicio: AutenticacionService, private router: Router) {}

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }

  logOut(): void {
    this.authServicio.logOut();
    // detectChanges ya no es necesario si usamos async en el template
  }

  get logueado(): boolean { 
    return this.authServicio.sessionIniciada(); 
  }

  get rol(): string | null {
    const r = this.authServicio.getUsuarioRol();
    if (!r) return null;

    if (r.toUpperCase() === 'CLIENTE') return 'cliente';
    if (r.toUpperCase() === 'EMPLEADO') return 'empleado';
    return null;
  }

  get esCliente(): boolean { return this.rol === 'cliente'; }
  get esEmpleado(): boolean { return this.rol === 'empleado'; }

  onUserClick() { console.log('Usuario clickeó el botón de perfil/roles'); }
}