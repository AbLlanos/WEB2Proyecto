// formulario-producto.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavBarComponent],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent implements OnInit {

  productoForm!: FormGroup;

  constructor(private fb: FormBuilder, private servicioProducto: ProductoService, private router: Router) {}

  ngOnInit() {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      precio: [0, [Validators.required, Validators.min(0.01)]],
      cantidad: [0, [Validators.required, Validators.min(1)]],
      iva: [0.15, [Validators.required, Validators.min(0), Validators.max(1)]],
      ingredientes: ['', Validators.required],
      categoria: ['', Validators.required],
      img: ['', Validators.required],
      disponible: ['', Validators.required]
    });
  }

  agregarProducto() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    this.servicioProducto.guardarProducto(this.productoForm.value).subscribe(() => {
      alert('Producto guardado correctamente.');
      window.location.reload();
    });
  }
}
