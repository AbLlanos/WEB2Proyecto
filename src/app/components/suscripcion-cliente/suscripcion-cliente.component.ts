import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../general/nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../general/footer/footer.component";

@Component({
  selector: 'app-suscripcion-cliente',
  standalone: true,
  imports: [NavBarComponent, FormsModule, CommonModule, ReactiveFormsModule, FooterComponent],
  templateUrl: './suscripcion-cliente.component.html',
  styleUrls: ['./suscripcion-cliente.component.css']
})
export class SuscripcionClienteComponent implements OnInit {
  tarjetaForm!: FormGroup;

  suscripciones = [
    { nombre: 'NORMAL', descuento: 0.05 },
    { nombre: 'MEDIA', descuento: 0.10 },
    { nombre: 'PREMIUM', descuento: 0.15 }
  ];

  userId!: string | null;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router) { }

  ngOnInit() {
    this.tarjetaForm = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^(\d{4} ){3}\d{4}$|^\d{16}$/)]],
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      suscripcion: ['', Validators.required]
    });

    // Obtener ID del usuario desde localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userId = user.id || null; // <-- ID como string
    } else {
      this.userId = null;
    }
  }

  submitTarjeta() {
    if (!this.tarjetaForm.valid) {
      this.tarjetaForm.markAllAsTouched();
      alert('Por favor completa todos los campos correctamente.');
      return;
    }

    if (!this.userId) {
      alert('Usuario no identificado, por favor inicia sesión');
      return;
    }

    const datosTarjeta = this.tarjetaForm.value;

    // Guardar localmente
    localStorage.setItem('suscripcionActiva', JSON.stringify(true));
    localStorage.setItem('tarjeta', JSON.stringify(datosTarjeta));

    // Actualizar el cliente en backend con campos planos
    this.clienteService.buscarClientePorId(this.userId).subscribe({
      next: (clienteActual) => {
        if (!clienteActual) {
          alert('No se encontró el usuario en la base de datos.');
          return;
        }

        const clienteActualizado = {
          ...clienteActual,
          suscripcionActiva: true,
          fechaActivacion: new Date().toISOString(),
          tipoSuscripcion: datosTarjeta.suscripcion
        };

        this.clienteService.actualizarCliente(this.userId!, clienteActualizado).subscribe({
          next: () => {
            alert('Suscripción activada y guardada correctamente.');
            this.router.navigate(['/perfilCliente']);
          },
          error: (err) => {
            console.error('Error al actualizar la suscripción:', err);
            alert('Error al guardar la suscripción.');
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener el usuario:', err);
        alert('Error al obtener datos del usuario.');
      }
    });
  }
}
