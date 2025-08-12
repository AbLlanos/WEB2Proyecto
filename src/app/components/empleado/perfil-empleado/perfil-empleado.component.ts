import { Component, inject } from '@angular/core';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { EdadPipe } from '../../../pipes/edad.pipe';
import { NombrePipe } from '../../../pipes/nombre.pipe';
import { FooterComponent } from "../../general/footer/footer.component";

@Component({
  selector: 'app-perfil-empleado',
  standalone: true,
  imports: [NavBarComponent, RouterLink, EdadPipe, NombrePipe, FooterComponent],
  templateUrl: './perfil-empleado.component.html',
  styleUrl: './perfil-empleado.component.css'
})
export class PerfilEmpleadoComponent {
  usuario: any = null;

  // Inyectamos servicios para obtener usuario real
  private empleadoService = inject(EmpleadoService);
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

    this.empleadoService.buscarEmpleadoPorCorreo(emailUsuario).subscribe({
      next: (resp) => {
        const keys = Object.keys(resp || {});
        if (keys.length > 0) {
          this.usuario = resp[keys[0]];


          if (this.usuario.fechaNacimiento) {
            this.usuario.fechaNacimiento = this.usuario.fechaNacimiento.split('T')[0];
          }

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