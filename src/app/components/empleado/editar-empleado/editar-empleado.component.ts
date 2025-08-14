import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../general/footer/footer.component";
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { EmpleadoService } from '../../../services/empleado.service';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Empleado } from '../formulario-empleado/empleado';

@Component({
  selector: 'app-editar-empleado',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, ReactiveFormsModule],
  templateUrl: './editar-empleado.component.html',
  styleUrl: './editar-empleado.component.css'
})
export class EditarEmpleadoComponent implements OnInit {
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

  empleadoId: number | null = null;
  empleadoExtra: any = {};

  constructor(
    private servicioEmpleado: EmpleadoService,
    private router: Router,
    private authServicio: AutenticacionService
  ) { }

  ngOnInit() {
    if (!this.authServicio.sessionIniciada()) {
      this.router.navigate(['/login']);
      return;
    }
    this.cargarDatosEmpleado();
  }

  cargarDatosEmpleado() {
    const emailUsuario = this.authServicio.getUsuarioEmail();
    if (!emailUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.servicioEmpleado.buscarEmpleadoPorCorreo(emailUsuario).subscribe({
      next: (empleados) => {
        if (empleados && empleados.length > 0) {
          const empleado = empleados[0]; // <- toma el primer elemento del array
          this.empleadoId = empleado.id;
          this.empleadoExtra = { ...empleado };

          this.empleadoForm.patchValue({
            nombreCompleto: empleado.nombreCompleto,
            cedula: empleado.cedula,
            direccion: empleado.direccion,
            telefono: empleado.telefono,
            correoElectronico: empleado.correoElectronico,
            fechaNacimiento: empleado.fechaNacimiento?.split('T')[0],
            genero: empleado.genero,
            password: empleado.password,
            fechaRegistro: empleado.fechaRegistro?.split('T')[0]
          });
        } else {
          alert('Empleado no encontrado');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => console.error('Error al cargar empleado', err)
    });
  }

  camposSinLlenar = (): boolean => {
    return !this.enviado && Object.values(this.empleadoForm.controls).some(control => {
      const value = control.value;
      return typeof value === 'string' ? value.trim() === '' : value === null || value === '';
    });
  };

  actualizarEmpleado() {
    if (this.empleadoForm.valid && this.empleadoId !== null) {
      const empleadoData = this.empleadoForm.getRawValue();
      const empleadoCompleto = { ...this.empleadoExtra, ...empleadoData };

      this.servicioEmpleado.actualizarEmpleado(this.empleadoId!.toString(), empleadoCompleto)
        .subscribe({
          next: () => {
            alert("Empleado actualizado correctamente");
            this.router.navigate(['/perfilEmpleado']);
          },
          error: (err) => console.error('Error al actualizar empleado', err)
        });
    } else {
      alert('Complete todos los campos correctamente antes de actualizar.');
    }
  }
}
