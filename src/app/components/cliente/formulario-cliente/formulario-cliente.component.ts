import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './formulario-cliente.component.html',
  styleUrl: './formulario-cliente.component.css'
})
export class FormularioClienteComponent {


  constructor(private servicioCliente: ClienteService) { }

  id: string = "";
  nombreCompleto: string = "";
  cedula: string = "";
  direccion: string = "";
  telefono: string = "";
  correoElectronico: string = "";
  fechaNacimiento: string = "";
  genero: string = "";
  fechaRegistro: string = "";

  agregarCliente(formulario: any) {
    this.servicioCliente.guardarCliente(formulario.value).subscribe(() =>
      window.location.reload()
    )
  }

}
