import { Component, inject, OnInit } from '@angular/core';
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
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit {
  usuario: Empleado | null = null;

  private empleadoService = inject(EmpleadoService);
  private authServicio = inject(AutenticacionService);
  private router = inject(Router);

  ngOnInit(): void {
    // Verifica si hay sesión activa
    if (!this.authServicio.sessionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const idUsuario = this.authServicio.getUsuarioId();
    if (!idUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    // Buscar empleado por ID
    this.empleadoService.buscarEmpleadoPorId(idUsuario).subscribe({
      next: (empleado) => {
        this.usuario = empleado;
        // Formateo de fecha
        if (this.usuario.fechaNacimiento) {
          this.usuario.fechaNacimiento = this.usuario.fechaNacimiento.split('T')[0];
        }
      },
      error: (err) => {
        console.error('Error al cargar datos del empleado', err);
        this.router.navigate(['/login']);
      }
    });
  }
}
