import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from "../../general/footer/footer.component";
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FooterComponent,
    NavBarComponent
  ],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.css'
})
export class FormularioClienteComponent {
  enviado: boolean = false;
  fb = inject(FormBuilder);

  clienteForm: FormGroup = this.fb.group({
    nombreCompleto: ['', Validators.required],
    cedula: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    direccion: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    fechaRegistro: [{ value: new Date().toISOString().split('T')[0], disabled: true }] // autogenerado
  });

  constructor(
    private servicioCliente: ClienteService,
    private router: Router
  ) {}

  // Detecta si hay datos llenos en el formulario sin enviar
  camposSinLlenar = (): boolean => {
    return !this.enviado && Object.values(this.clienteForm.controls).some(control => {
      const value = control.value;
      return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== '';
    });
  };

  agregarCliente() {
    if (this.clienteForm.valid) {
      this.enviado = true;

      const clienteData = {
        ...this.clienteForm.getRawValue(), 
        fechaRegistro: new Date().toISOString().split('T')[0] 
      };

      this.servicioCliente.guardarCliente(clienteData).subscribe({
        next: () => {
          alert("Cliente registrado correctamente.");
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error("Error al registrar cliente", err);
        }
      });
    } else {
      this.clienteForm.markAllAsTouched();
      alert("Por favor completa todos los campos correctamente.");
    }
  }
}
