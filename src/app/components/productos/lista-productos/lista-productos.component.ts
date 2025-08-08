import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  productos: any[] = [];
  productoSeleccionado: any = null;
  cantidadSeleccionada: number = 1;
  subtotal = 0;
  total = 0;

  constructor(
    private productoService: ProductoService,
    private pedidosService: PedidosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.productoService.leerProductos().subscribe(data => {
      this.productos = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    });
  }

  abrirModal(producto: any) {
    this.productoSeleccionado = producto;
    this.cantidadSeleccionada = 1;
    this.calcularTotal();
  }

  onCantidadChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.cantidadSeleccionada = Number(input.value) || 1;
    this.calcularTotal();
  }

  calcularTotal() {
    if (!this.productoSeleccionado) return;
    this.subtotal = this.productoSeleccionado.precio * this.cantidadSeleccionada;
    const ivaMonto = this.subtotal * this.productoSeleccionado.iva;
    this.total = +(this.subtotal + ivaMonto).toFixed(2);
  }

  confirmarCompra() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('User desde localStorage:', user);
    if (!user.id) {
      console.error('No hay id de usuario en localStorage!');
      alert('Error: Usuario no identificado. Por favor, inicie sesión.');
      return;
    }
    const pedido = {
      fecha: new Date().toISOString(),
      total: this.total,
      productos: [
        {
          nombre: this.productoSeleccionado.nombre,
          cantidad: this.cantidadSeleccionada,
          precioUnitario: this.productoSeleccionado.precio,
          iva: this.productoSeleccionado.iva,
          subtotal: this.subtotal
        }
      ]
    };

    this.pedidosService.guardarPedidoUsuario(user.id, pedido).subscribe({
      next: () => {
        this.pedidosService.guardarPedidoGlobal({ ...pedido, idUsuario: user.id }).subscribe({
          next: () => {
            const nuevaCantidad = this.productoSeleccionado.cantidad - this.cantidadSeleccionada;
            this.pedidosService.actualizarStock(this.productoSeleccionado.id, nuevaCantidad).subscribe({
              next: () => {
                alert('Pedido realizado con éxito');
                this.productoSeleccionado = null; // Cerrar modal
              },
              error: () => {
                alert('Error al actualizar stock');
              }
            });
          },
          error: () => {
            alert('Error al guardar pedido global');
          }
        });
      },
      error: () => {
        alert('Error al guardar pedido del usuario');
      }
    });
  }
}
