import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { PedidosService } from '../../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  carrito: any[] = [];
  mostrarCarrito: boolean = false;

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

  agregarAlCarrito(producto: any) {
    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += 1;
      existente.subtotal = existente.precio * existente.cantidad;
      existente.total = existente.subtotal * (1 + existente.iva);
    } else {
      this.carrito.push({
        ...producto,
        cantidad: 1,
        subtotal: producto.precio,
        total: producto.precio * (1 + producto.iva)
      });
    }
  }

  eliminarDelCarrito(id: string) {
    this.carrito = this.carrito.filter(p => p.id !== id);
  }

  calcularTotalesCarrito() {
    return this.carrito.reduce(
      (acc, p) => {
        acc.subtotal += p.subtotal;
        acc.total += p.total;
        return acc;
      },
      { subtotal: 0, total: 0 }
    );
  }

  confirmarPedido() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Error: Usuario no identificado. Por favor, inicie sesión.');
      return;
    }

    const totales = this.calcularTotalesCarrito();
    const pedido = {
      fecha: new Date().toISOString(),
      total: +totales.total.toFixed(2),
      productos: this.carrito.map(p => ({
        nombre: p.nombre,
        cantidad: p.cantidad,
        precioUnitario: p.precio,
        iva: p.iva,
        subtotal: +p.subtotal.toFixed(2)
      }))
    };

    // Guardar pedido del usuario
    this.pedidosService.guardarPedidoUsuario(user.id, pedido).subscribe({
      next: () => {
        // Guardar pedido global
        this.pedidosService.guardarPedidoGlobal({ ...pedido, idUsuario: user.id }).subscribe({
          next: () => {
            // Actualizar stock
            const actualizaciones = this.carrito.map(p =>
              this.pedidosService.actualizarStock(p.id, p.cantidad > p.disponible ? 0 : p.disponible - p.cantidad)
            );

            Promise.all(actualizaciones.map(req => req.toPromise())).then(() => {
              alert('Pedido realizado con éxito');
              this.carrito = [];
              this.mostrarCarrito = false;
            }).catch(() => {
              alert('Error al actualizar stock');
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
