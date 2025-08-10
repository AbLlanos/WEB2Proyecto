import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { Router, RouterLink } from '@angular/router';
import { SuscripcionActivaPipe } from '../../../pipes/suscripcion-activa.pipe';
import { TiempoRestantePipe } from '../../../pipes/tiempo-restante.pipe';
import { NombrePipe } from '../../../pipes/nombre.pipe';
import { EdadPipe } from '../../../pipes/edad.pipe';
import { ClienteService } from '../../../services/cliente.service';
import { AutenticacionService } from '../../../services/autenticacion.service';


@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [NavBarComponent, RouterLink, EdadPipe, NombrePipe, SuscripcionActivaPipe, TiempoRestantePipe],
  templateUrl: './perfil-cliente.component.html',
  styleUrl: './perfil-cliente.component.css'
})
export class PerfilClienteComponent implements OnInit {
  usuario: any = null;

  // Inyectamos servicios para obtener usuario real
  private clienteService = inject(ClienteService);
  private authServicio = inject(AutenticacionService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const emailUsuario = this.authServicio.getUsuarioEmail?.();
    if (!emailUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.clienteService.buscarClientePorCorreo(emailUsuario).subscribe({
      next: (resp) => {
        const keys = Object.keys(resp || {});
        if (keys.length > 0) {
          this.usuario = resp[keys[0]];

          // Si la fechaNacimiento viene en otro formato, aquí puedes transformarla:
          if (this.usuario.fechaNacimiento) {
            this.usuario.fechaNacimiento = this.usuario.fechaNacimiento.split('T')[0]; // para input date o pipes
          }
          // Igual para fechaActivacion si usas suscripción
          if (this.usuario.suscripcion?.fechaActivacion) {
            this.usuario.suscripcion.fechaActivacion = this.usuario.suscripcion.fechaActivacion.split('T')[0];
          }
        } else {
          alert('Usuario no encontrado');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error al cargar usuario', err);
      }
    });
  }
}