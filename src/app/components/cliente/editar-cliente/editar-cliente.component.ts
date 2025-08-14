import { Component, OnInit } from '@angular/core';
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
  clienteForm: FormGroup;
  userId: string | null = null;
  clienteExtra: any = {};

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private authServicio: AutenticacionService
  ) {
    this.clienteForm = this.fb.group({
      nombreCompleto: [''],
      cedula: [''],
      direccion: [''],
      telefono: [''],
      correoElectronico: [''],
      fechaNacimiento: [''],
      genero: [''],
      password: [''], // password opcional
      fechaRegistro: [{ value: new Date().toISOString().split('T')[0], disabled: true }],
      rol: ['CLIENTE']
    });
  }

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      this.router.navigate(['/login']);
      return;
    }

    const user = JSON.parse(userStr);
    this.userId = user.id;

    if (!this.userId) {
      alert('Usuario no identificado');
      this.router.navigate(['/login']);
      return;
    }

    this.clienteService.buscarClientePorId(this.userId).subscribe({
      next: (cliente) => {
        if (!cliente) {
          alert('Cliente no encontrado');
          this.router.navigate(['/login']);
          return;
        }

        this.clienteExtra = { ...cliente };

        this.clienteForm.patchValue({
          nombreCompleto: cliente.nombreCompleto,
          cedula: cliente.cedula,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
          correoElectronico: cliente.correoElectronico,
          fechaNacimiento: cliente.fechaNacimiento?.split('T')[0] || '',
          genero: cliente.genero,
          fechaRegistro: cliente.fechaRegistro?.split('T')[0] || ''
          // password NO se llena para evitar re-encriptar
        });
      },
      error: (err) => {
        console.error('Error al cargar cliente', err);
        alert('Error al obtener datos del cliente.');
      }
    });
  }

  actualizarCliente() {
    if (!this.userId) return;

    const clienteData = this.clienteForm.getRawValue();

    // Crear copia de clienteExtra
    const clienteCompleto: any = { ...this.clienteExtra };

    // Actualizar campos que sí se editaron
    for (const key in clienteData) {
      if (key === 'password') {
        // Solo asignar password si no está vacío
        if (clienteData.password) {
          clienteCompleto.password = clienteData.password;
        }
      } else {
        clienteCompleto[key] = clienteData[key];
      }
    }

    this.clienteService.actualizarCliente(this.userId, clienteCompleto).subscribe({
      next: () => {
        alert("Cliente actualizado correctamente");
        this.router.navigate(['/perfilCliente']);
      },
      error: (err) => {
        console.error('Error al actualizar cliente', err);
        alert('Error al actualizar el cliente.');
      }
    });
  }

}
