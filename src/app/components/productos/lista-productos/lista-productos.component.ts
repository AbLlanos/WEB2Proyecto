import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { PedidosService } from '../../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';

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

  usuario: any = null;
  descuentoAplicado: number = 0; // porcentaje descuento: 0.2 = 20%

  // Mapa de categorías permitidas por suscripción
  categoriaPorSuscripcion: Record<string, string[]> = {
    normal: ['postres'],
    media: ['postres', 'bebidas'],
    premium: ['hamburguesas', 'postres', 'bebidas']
  };

  constructor(
    private productoService: ProductoService,
    private pedidosService: PedidosService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Obtener usuario y suscripción activa
    const userString = localStorage.getItem('user');
    let tipoSuscripcion = '';
    if (userString) {
      const usuario = JSON.parse(userString);
      if (usuario.suscripcion_activa && usuario.tipo_suscripcion) {
        tipoSuscripcion = usuario.tipo_suscripcion.toLowerCase();
      }
    }

    // Asignar descuento según suscripción
    if (tipoSuscripcion === 'normal') this.descuentoAplicado = 0.05;
    else if (tipoSuscripcion === 'media') this.descuentoAplicado = 0.10;
    else if (tipoSuscripcion === 'premium') this.descuentoAplicado = 0.15;
    else this.descuentoAplicado = 0;

    // Leer productos desde backend
    this.productoService.leerProductos().subscribe(data => {
      this.productos = data.map(p => {
        // Normalizar stock
        p.disponible = Number(p.cantidad ?? 0);
        p.disponibleTexto = p.disponible > 0 ? 'sí' : 'no';
        p.cantidadSeleccionada = p.disponible > 0 ? 1 : 0;

        // Precio con descuento según categoría y suscripción
        p.precioConDescuento = p.precio;
        const categoriasPermitidas = this.categoriaPorSuscripcion[tipoSuscripcion] || [];
        if (this.descuentoAplicado > 0 && categoriasPermitidas.includes(p.categoria.toLowerCase())) {
          p.precioConDescuento = +(p.precio * (1 - this.descuentoAplicado)).toFixed(2);
        }

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

    const precioUsar = producto.precioConDescuento ?? producto.precio;

    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.precio * existente.cantidad;
      existente.total = existente.subtotal * (1 + existente.iva);
    } else {
      this.carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: precioUsar,
        iva: producto.iva ?? 0,
        cantidad: cantidad,
        subtotal: precioUsar * cantidad,
        total: precioUsar * cantidad * (1 + (producto.iva ?? 0)),
        disponible: producto.disponible
      });
    }

    producto.cantidadSeleccionada = 1;

    alert(`Producto agregado: ${producto.nombre}\nCantidad: ${cantidad}`);
  }

  eliminarDelCarrito(id: string) {
    this.carrito = this.carrito.filter(p => p.id !== id);
  }

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
    const totales = this.carrito.reduce(
      (acc, p) => {
        acc.subtotal += p.subtotal;
        acc.iva += p.ivaPagado ?? (p.subtotal * (p.iva ?? 0));
        return acc;
      },
      { subtotal: 0, iva: 0 }
    );
    totales.total = totales.subtotal + totales.iva;
    return totales;
  }

  confirmarPedido() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      alert('Error: Usuario no identificado. Por favor, inicie sesión.');
      return;
    }

    const totales = this.calcularTotalesCarrito();
    const nuevoPedido = {
      fecha: new Date().toISOString(),
      cliente: { id: user.id },
      productos: this.carrito.map(p => ({
        producto: { id: p.id },
        cantidad: p.cantidad,
        precioUnitario: p.precio,
        iva: p.iva,
        ivaPagado: +(p.subtotal * (p.iva ?? 0)).toFixed(2),
        subtotal: +p.subtotal.toFixed(2),
        total: +p.total.toFixed(2)
      }))
    };

    // Cambiado a la función correcta para Spring Boot
    this.pedidosService.guardarPedido(nuevoPedido).subscribe({
      next: async () => {
        // actualizar stock de todos los productos (no usamos try/catch porque no queremos alerta)
        const actualizaciones = this.carrito.map(p =>
          this.pedidosService.actualizarStock(p.id, Math.max(0, p.disponible - p.cantidad))
        );

        // convertir Observables a Promises y esperar, pero ignorando errores
        await Promise.all(actualizaciones.map(req =>
          lastValueFrom(req).catch(() => null) // cualquier error se ignora
        ));

        alert('Pedido realizado exitosamente.');
        this.carrito = [];
        this.mostrarCarrito = false;
      },
      error: () => {
        alert('Error al guardar pedido');
      }
    });
  }
}
