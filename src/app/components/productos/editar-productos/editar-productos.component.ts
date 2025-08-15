import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.css'
})
export class EditarProductosComponent {

 productoForm!: FormGroup;
  id: string = "";

  constructor(private fb: FormBuilder, 
              private servicioProducto: ProductoService,
              private router: Router, 
              private ruta: ActivatedRoute) {}

  ngOnInit(): void {
    // Inicializar el formulario
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

    // Cargar producto
    this.ruta.params.subscribe(params => {
      this.id = params['id'];
      this.servicioProducto.buscarProductobyId(this.id).subscribe(producto => {
        this.productoForm.patchValue(producto);
      });
    });
  }

  editarProducto(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoActualizado = { ...this.productoForm.value, id: this.id };
    this.servicioProducto.editarProducto(this.id, productoActualizado).subscribe(() => {
      this.router.navigate(['/productosEmpleado']);
    });
  }
}