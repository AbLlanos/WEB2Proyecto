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
  styleUrls: ['./editar-empleado.component.css'] // corregido
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
    console.log('ngOnInit: Verificando sesión...');
    if (!this.authServicio.sessionIniciada()) {
      console.warn('Sesión no iniciada. Redirigiendo a login...');
      this.router.navigate(['/login']);
      return;
    }
    this.cargarDatosEmpleado();
  }

  cargarDatosEmpleado() {
    const idUsuario = this.authServicio.getUsuarioId();
    console.log('Cargando datos del usuario con ID:', idUsuario);

    if (!idUsuario) {
      console.error('No se encontró el ID del usuario en la sesión. Redirigiendo a login...');
      this.router.navigate(['/login']);
      return;
    }

    this.servicioEmpleado.buscarEmpleadoPorId(idUsuario).subscribe({
      next: (empleado) => {
        if (empleado) {
          this.empleadoId = empleado.id;
          this.empleadoExtra = { ...empleado };
          console.log('Empleado encontrado:', empleado);

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
          console.log('Formulario parcheado con los datos del empleado.');
        } else {
          console.warn('Empleado no encontrado. Redirigiendo a login...');
          alert('Empleado no encontrado');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error al cargar empleado:', err);
        alert('Error al cargar los datos del empleado. Revise la consola.');
      }
    });
  }

  camposSinLlenar = (): boolean => {
    const incompletos = Object.values(this.empleadoForm.controls).some(control => {
      const value = control.value;
      return typeof value === 'string' ? value.trim() === '' : value === null || value === '';
    });
    console.log('Campos sin llenar:', incompletos);
    return !this.enviado && incompletos;
  };

  actualizarEmpleado() {
    if (this.empleadoForm.valid && this.empleadoId !== null) {
      const empleadoData = this.empleadoForm.getRawValue();
      const empleadoCompleto = { ...this.empleadoExtra, ...empleadoData };

      console.log('Enviando actualización para empleado ID:', this.empleadoId);
      console.log('Datos enviados:', empleadoCompleto);

      this.servicioEmpleado.actualizarEmpleado(this.empleadoId!.toString(), empleadoCompleto)
        .subscribe({
          next: (res) => {
            console.log('Respuesta del servidor al actualizar empleado:', res);
            alert("Empleado actualizado correctamente");
            this.router.navigate(['/perfilEmpleado']);
          },
          error: (err) => {
            console.error('Error al actualizar empleado:', err);
            alert('Error al actualizar empleado. Revise la consola para más detalles.');
          }
        });
    } else {
      console.warn('Formulario inválido o empleadoId nulo. No se puede actualizar.');
      alert('Complete todos los campos correctamente antes de actualizar.');
    }
  }
}
