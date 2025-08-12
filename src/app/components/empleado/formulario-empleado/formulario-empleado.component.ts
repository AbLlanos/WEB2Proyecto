import { Component, inject } from '@angular/core';
import { FooterComponent } from "../../general/footer/footer.component";
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { ClienteService } from '../../../services/cliente.service';
import { FormBuilder, FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EmpleadoService } from '../../../services/empleado.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-empleado',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    FooterComponent,
    NavBarComponent],
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css'
})
export class FormularioEmpleadoComponent {
  enviado: boolean = false;
  fb = inject(FormBuilder);

  empleadoForm: FormGroup = this.fb.group({
    nombreCompleto: ['', Validators.required],
    cedula: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    direccion: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    correoElectronico: ['', [Validators.required, Validators.email]],
    fechaNacimiento: ['', Validators.required],
    genero: ['', Validators.required],
    password: ["", [Validators.required, Validators.minLength(6)]],
    fechaRegistro: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
    rol: ['EMPLEADO']
  });

  constructor(
    private servicioEmpleado: EmpleadoService,
    private router: Router
  ) { }

  // Detecta si hay datos llenos en el formulario sin enviar
  camposSinLlenar = (): boolean => {
    return !this.enviado && Object.values(this.empleadoForm.controls).some(control => {
      const value = control.value;
      return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== '';
    });
  };

  agregarEmpleado() {
    if (this.empleadoForm.valid) {
      this.enviado = true;

      const empleadoData = {
        ...this.empleadoForm.getRawValue(),
        fechaRegistro: new Date().toISOString().split('T')[0]
      };

      this.servicioEmpleado.guardarEmpleado(empleadoData).subscribe({
        next: () => {
          alert("Empleado registrado correctamente.");
          this.router.navigate(['/inicioEmpleado']);
        },
        error: err => {
          console.error("Error al registrar empleado", err);
        }
      });
    } else {
      this.empleadoForm.markAllAsTouched();
      alert("Por favor completa todos los campos correctamente.");
    }
  }
}
