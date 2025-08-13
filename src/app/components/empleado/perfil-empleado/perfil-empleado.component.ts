import { Component, inject } from '@angular/core';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { EdadPipe } from '../../../pipes/edad.pipe';
import { NombrePipe } from '../../../pipes/nombre.pipe';
import { FooterComponent } from "../../general/footer/footer.component";
import { Empleado } from '../formulario-empleado/empleado';

@Component({
  selector: 'app-perfil-empleado',
  standalone: true,
  imports: [NavBarComponent, RouterLink, EdadPipe, NombrePipe, FooterComponent],
  templateUrl: './perfil-empleado.component.html',
  styleUrl: './perfil-empleado.component.css'
})
export class PerfilEmpleadoComponent {
   usuario: Empleado | null = null;

  private empleadoService = inject(EmpleadoService);
  private authServicio = inject(AutenticacionService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const emailUsuario = this.authServicio.getUsuarioEmail(); // llamar método normalmente
    if (!emailUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.empleadoService.buscarEmpleadoPorCorreo(emailUsuario).subscribe({
      next: (resp) => {
        if (resp && resp.length > 0) {
          this.usuario = resp[0];

          // Formateo de fechas
          if (this.usuario.fechaNacimiento) {
            this.usuario.fechaNacimiento = this.usuario.fechaNacimiento.split('T')[0];
          }

        } else {
          alert('Usuario no encontrado');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error al cargar usuario', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
