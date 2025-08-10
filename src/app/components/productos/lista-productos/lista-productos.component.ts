import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { PedidosService } from '../../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
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
      this.productos = Object.keys(data).map(key => {
        const p = { id: key, ...data[key] };

        if (typeof p.disponible === 'string') {
          if (p.disponible.toLowerCase() === 'sí' || p.disponible.toLowerCase() === 'si') {
            p.disponible = 999999; // número alto para stock
            p.disponibleTexto = 'sí';
          } else {
            p.disponible = 0;
            p.disponibleTexto = 'no';
          }
        } else {
          p.disponible = Number(p.disponible) || 0;
          p.disponibleTexto = p.disponible > 0 ? 'sí' : 'no';
        }

        p.cantidadSeleccionada = p.disponible > 0 ? 1 : 0;
        return p;
      });
    });
  }

  incrementar(producto: any) {
    if (!producto.cantidadSeleccionada) producto.cantidadSeleccionada = 1;
    producto.cantidadSeleccionada = Math.min(producto.cantidadSeleccionada + 1, producto.disponible);
  }

  decrementar(producto: any) {
    if (!producto.cantidadSeleccionada) producto.cantidadSeleccionada = 1;
    producto.cantidadSeleccionada = Math.max(producto.cantidadSeleccionada - 1, 1);
  }

  agregarAlCarrito(producto: any, cantidad: number = 1) {
    const stock = producto.disponible ?? producto.cantidad ?? 0;
    if (cantidad <= 0) return;
    if (cantidad > stock) {
      alert('La cantidad solicitada supera el stock disponible');
      return;
    }

    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.precio * existente.cantidad;
      existente.total = existente.subtotal * (1 + existente.iva);
    } else {
      this.carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        iva: producto.iva ?? 0,
        cantidad: cantidad,
        subtotal: producto.precio * cantidad,
        total: producto.precio * cantidad * (1 + (producto.iva ?? 0)),
        disponible: producto.disponible
      });
    }

    // Restablecer cantidad seleccionada a 1
    producto.cantidadSeleccionada = 1;

    // Mostrar alerta con nombre y cantidad seleccionada
    alert(`Producto agregado: ${producto.nombre}\nCantidad: ${cantidad}`);
  }


  eliminarDelCarrito(id: string) {
    this.carrito = this.carrito.filter(p => p.id !== id);
  }

  // Método para manejar cambio de cantidad en modal carrito
  actualizarCantidadCarrito(item: any, nuevaCantidad: number) {
    if (nuevaCantidad < 1) {
      item.cantidad = 1;
    } else if (nuevaCantidad > item.disponible) {
      alert('La cantidad no puede superar el stock disponible.');
      item.cantidad = item.disponible;
    } else {
      item.cantidad = nuevaCantidad;
    }
    item.subtotal = item.precio * item.cantidad;
    item.total = item.subtotal * (1 + (item.iva ?? 0));
  }

  calcularTotalesCarrito() {
    return this.carrito.reduce(
      (acc, p) => {
        acc.subtotal += p.subtotal;
        acc.total += p.total;
        acc.iva += p.subtotal * (p.iva ?? 0);
        return acc;
      },
      { subtotal: 0, total: 0, iva: 0 }
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
        subtotal: +p.subtotal.toFixed(2),
        ivaPagado: +(p.subtotal * (p.iva ?? 0)).toFixed(2)
      }))
    };


    this.pedidosService.guardarPedidoUsuario(user.id, pedido).subscribe({
      next: () => {
        this.pedidosService.guardarPedidoGlobal({ ...pedido, idUsuario: user.id }).subscribe({
          next: () => {
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
