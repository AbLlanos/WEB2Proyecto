import { Component } from '@angular/core';
import { FooterComponent } from "../../general/footer/footer.component";
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { ProductoService } from '../../../services/producto.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-empleado',
  standalone: true,
  imports: [FooterComponent, NavBarComponent,RouterLink,FormsModule],
  templateUrl: './productos-empleado.component.html',
  styleUrl: './productos-empleado.component.css'
})
export class ProductosEmpleadoComponent {

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
