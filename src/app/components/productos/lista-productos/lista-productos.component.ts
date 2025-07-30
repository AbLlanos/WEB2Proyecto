import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {

  constructor(private servicioProducto : ProductoService) { }


  productos: any[] = [];


  ngOnInit() {
    this.servicioProducto.leerProductos().subscribe(data => {
      this.productos = Object.values(data);
    });
  }

}
