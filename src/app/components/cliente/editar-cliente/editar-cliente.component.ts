import { Component, inject, OnInit } from '@angular/core';
import { FooterComponent } from "../../general/footer/footer.component";
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { ClienteService } from '../../../services/cliente.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutenticacionService } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [FooterComponent, NavBarComponent, ReactiveFormsModule],
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
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
    password: ["", [Validators.required, Validators.minLength(6)]],
    fechaRegistro: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
    rol: ['CLIENTE'] 
  });

  clienteKey: string | null = null;
  
  // Aquí guardamos el objeto completo del cliente original
  clienteExtra: any = {};

  constructor(
    private servicioCliente: ClienteService,
    private router: Router,
    private authServicio: AutenticacionService
  ) { }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    let emailUsuario: string | null = null;

    if (this.authServicio.getUsuarioEmail) {
      emailUsuario = this.authServicio.getUsuarioEmail();
    }

    if (!emailUsuario) {
      this.router.navigate(['/login']);
      return;
    }

    this.servicioCliente.buscarClientePorCorreo(emailUsuario).subscribe({
      next: (resp) => {
        const keys = Object.keys(resp || {});
        if (keys.length > 0) {
          this.clienteKey = keys[0];
          const cliente = resp[this.clienteKey];

          // Guardamos todo el objeto para conservar campos extra no editables
          this.clienteExtra = { ...cliente };

          // Parcheamos solo los campos del formulario
          this.clienteForm.patchValue({
            nombreCompleto: cliente.nombreCompleto,
            cedula: cliente.cedula,
            direccion: cliente.direccion,
            telefono: cliente.telefono,
            correoElectronico: cliente.correoElectronico,
            fechaNacimiento: cliente.fechaNacimiento,
            genero: cliente.genero,
            password: cliente.password,
            fechaRegistro: cliente.fechaRegistro
          });
        } else {
          alert('Cliente no encontrado');
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        console.error('Error al cargar cliente', err);
      }
    });
  }

  camposSinLlenar = (): boolean => {
    return !this.enviado && Object.values(this.clienteForm.controls).some(control => {
      const value = control.value;
      return typeof value === 'string' ? value.trim() !== '' : value !== null && value !== '';
    });
  };

  actualizarCliente() {
    if (this.clienteForm.valid && this.clienteKey) {
      const clienteData = this.clienteForm.getRawValue();

      // Fusionamos los datos del formulario con los datos extras para no perder campos
      const clienteCompleto = {
        ...this.clienteExtra,  // datos originales
        ...clienteData        // datos modificados en formulario sobrescriben
      };

      this.servicioCliente.editarCliente(this.clienteKey, clienteCompleto).subscribe({
        next: () => {
          alert("Cliente actualizado correctamente");
          this.router.navigate(['/perfilCliente']);
        },
        error: (err) => console.error(err)
      });
    } else {
      alert('Complete todos los campos correctamente antes de actualizar.');
    }
  }
}
