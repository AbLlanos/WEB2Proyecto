import { Component, inject, OnInit } from '@angular/core';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { Router, RouterLink } from '@angular/router';
import { SuscripcionActivaPipe } from '../../../pipes/suscripcion-activa.pipe';
import { TiempoRestantePipe } from '../../../pipes/tiempo-restante.pipe';
import { NombrePipe } from '../../../pipes/nombre.pipe';
import { EdadPipe } from '../../../pipes/edad.pipe';
import { ClienteService } from '../../../services/cliente.service';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { FooterComponent } from "../../general/footer/footer.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil-cliente',
  standalone: true,
  imports: [
    NavBarComponent,
    RouterLink,
    EdadPipe,
    NombrePipe,
    SuscripcionActivaPipe,
    TiempoRestantePipe,
    DatePipe,
    FooterComponent
  ],
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.css']
})
export class PerfilClienteComponent implements OnInit {
  usuario: any = null;
  private clienteService = inject(ClienteService);
  private authServicio = inject(AutenticacionService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userStr);
    const userId = user.id;

    if (!userId) {
      alert('Usuario no identificado');
      this.router.navigate(['/login']);
      return;
    }

    this.clienteService.buscarClientePorId(userId).subscribe({
      next: (cliente) => {
        if (!cliente) {
          alert('Usuario no encontrado');
          this.router.navigate(['/login']);
          return;
        }

        // Aquí es donde pones el bloque
        this.clienteService.buscarClientePorId(userId).subscribe({
          next: (cliente) => {
            if (!cliente) {
              alert('Usuario no encontrado');
              this.router.navigate(['/login']);
              return;
            }

            // Directamente asignar
            this.usuario = cliente;

            console.log('Usuario cargado:', this.usuario);
          },
          error: (err) => {
            console.error('Error al cargar usuario', err);
            alert('Error al obtener datos del usuario.');
            this.router.navigate(['/login']);
          }
        });

        console.log('Usuario cargado:', this.usuario);
      },
      error: (err) => {
        console.error('Error al cargar usuario', err);
        alert('Error al obtener datos del usuario.');
        this.router.navigate(['/login']);
      }
    });
  }
}