import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';

import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-productos.component.html',
  styleUrl: './editar-productos.component.css'
})
export class EditarProductosComponent {

  constructor(private servicioProducto: ProductoService,
    private router: Router, private ruta: ActivatedRoute
  ) { }


  id: string = "";
  producto = <any>{
    id: "",
    nombre: "",
    precio: 0,
    cantidad: 0,
    iva: 0,
    precioTotal:0,
    ingredientes: "",
    categoria: "",
    img: "",
    disponible: "",
  }

  ngOnInit(): void {

    this.ruta.params.subscribe(params => {
      this.id = params["id"]
      this.servicioProducto.buscarProductobyId(this.id).subscribe(producto => {
        this.producto = producto;
      })
    })
  }


  editarProducto(formulario: any): void {
    const productoActualizado = { ...formulario.value, id: this.id };

    this.servicioProducto.editarProducto(this.id, productoActualizado).subscribe(() => {
      this.router.navigate(["/productosEmpleado"]);
    });
  }

}
