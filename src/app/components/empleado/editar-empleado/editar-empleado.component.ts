import { Component, inject } from '@angular/core';
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
export class EditarEmpleadoComponent {
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

  empleadoId: number | null = null; // <-- id numérico
  empleadoExtra: any = {};

  constructor(
    private servicioEmpleado: EmpleadoService,
    private router: Router,
    private authServicio: AutenticacionService
  ) { }

  ngOnInit() {
    this.cargarDatosEmpleado();
  }

  cargarDatosEmpleado() {
    const emailUsuario = this.authServicio.getUsuarioEmail?.();
    if (!emailUsuario) {
      this.router.navigate(['/login']);
      return;
    }

this.servicioEmpleado.buscarEmpleadoPorCorreo(emailUsuario).subscribe({
  next: (resp: Empleado[]) => { 
    if (resp.length > 0) {
      const empleado = resp[0];
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
      return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== '';
    });
  };

  actualizarEmpleado() {
    if (this.empleadoForm.valid && this.empleadoId !== null) {
      const empleadoData = this.empleadoForm.getRawValue();

      const empleadoCompleto = {
        ...this.empleadoExtra,
        ...empleadoData
      };

      this.servicioEmpleado.editarEmpleado(this.empleadoId, empleadoCompleto).subscribe({
        next: () => {
          alert("Empleado actualizado correctamente");
          this.router.navigate(['/perfilEmpleado']); 
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('Complete todos los campos correctamente antes de actualizar.');
    }
  }
}


