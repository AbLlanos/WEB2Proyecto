import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  constructor(private servicioProducto: ProductoService) { }

  productos: any[] = [];

  //Canviar oir keys

  ngOnInit(): void {
    this.servicioProducto.leerProductos().subscribe(data => {
      this.productos = Object.keys(data).map(key => ({
        id: key, ...data[key]
      }));
    });
  }

  eliminar(id: string): void {
    this.servicioProducto.eliminarProducto(id).subscribe(() => {
      this.productos = this.productos.filter(cliente => cliente.id !== id)
    }, error => {
      console.log("Error al eliminar producto", "error")
    })
  }

  get hamburguesas() {
    return this.productos.filter(p => p.categoria === 'Hamburguesas');
  }

  get bebidas() {
    return this.productos.filter(p => p.categoria === 'Bebidas');
  }

  get combos() {
    return this.productos.filter(p => p.categoria === 'Combos');
  }

  get postres() {
    return this.productos.filter(p => p.categoria === 'Postres');
  }

}
