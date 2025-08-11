import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../general/nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { Router } from '@angular/router';
import { FooterComponent } from "../general/footer/footer.component";  // <-- Importa Router

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
    { nombre: 'MEDIA', descuento: 0.05 },
    { nombre: 'PREMIUM', descuento: 0.05 }
  ];

  userId: string | null = null;

  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router) { } // <-- Inyecta Router

  ngOnInit() {
    this.tarjetaForm = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      suscripcion: ['', Validators.required]
    });

    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userId = user.id; 
    } else {
      this.userId = null;
    }
  }

  submitTarjeta() {
    if (this.tarjetaForm.valid) {
      if (!this.userId) {
        alert('Usuario no identificado, por favor inicia sesión');
        return;
      }

      const datos = this.tarjetaForm.value;

      const suscripcionActiva = {
        activa: true,
        fechaActivacion: new Date().toISOString(),
        tipoSuscripcion: datos.suscripcion
      };

      localStorage.setItem('suscripcionActiva', JSON.stringify(suscripcionActiva));
      localStorage.setItem('tarjeta', JSON.stringify(datos));

      this.clienteService.buscarClientebyId(this.userId).subscribe({
        next: (clienteActual) => {
          const clienteActualizado = {
            ...clienteActual,
            suscripcion: suscripcionActiva
          };

          this.clienteService.editarCliente(this.userId!, clienteActualizado).subscribe({
            next: () => {
              alert('Suscripción activada y guardada en la base de datos!');
              this.router.navigate(['/perfilCliente']);  // <-- Redirige aquí
            },
            error: (err) => {
              alert('Error al guardar la suscripción: ' + err);
            }
          });
        },
        error: (err) => {
          alert('Error al obtener datos del usuario: ' + err);
        }
      });
    } else {
      this.tarjetaForm.markAllAsTouched();
    }
  }
}
