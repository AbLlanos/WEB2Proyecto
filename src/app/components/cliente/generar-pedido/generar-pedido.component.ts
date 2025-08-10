import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../general/footer/footer.component";

@Component({
  selector: 'app-generar-pedido',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent, FooterComponent],
  templateUrl: './generar-pedido.component.html',
  styleUrl: './generar-pedido.component.css'
})
export class GenerarPedidoComponent {

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

  eliminarProducto(id: string): void {
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
