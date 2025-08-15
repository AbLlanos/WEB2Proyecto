import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { PedidosService } from '../../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Cliente } from '../../cliente/formulario-cliente/cliente';
import { AutenticacionService } from '../../../services/autenticacion.service';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent {
  productos: any[] = [];
  carrito: any[] = [];
  mostrarCarrito: boolean = false;

  usuario: Cliente | null = null;
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
    private http: HttpClient,
    private authService: AutenticacionService
  ) {}

  ngOnInit(): void {
    console.log("=== INICIO ListaProductosComponent ===");

    // Obtener usuario real desde AuthService
    const usuario = this.authService.getUsuario();
    if (!usuario) {
      console.warn("No se encontró usuario en sesión");
      return;
    }

    // Asignar usuario real y suscripción
    this.usuario = usuario;

    // ⚡ Cambios aquí: usar las propiedades reales del objeto
    const tipoSuscripcion = (usuario.tipo_suscripcion || 'normal').toLowerCase();
    const suscripcionActiva = !!usuario.suscripcion_activa;

    // Definir descuento según tipo de suscripción
    switch (tipoSuscripcion) {
      case 'premium':
        this.descuentoAplicado = 0.15; // 15%
        break;
      case 'media':
        this.descuentoAplicado = 0.1; // 10%
        break;
      default:
        this.descuentoAplicado = 0; // normal sin descuento
    }

    console.log("Usuario cargado:", usuario);
    console.log("Tipo de suscripción:", tipoSuscripcion, "Descuento aplicado:", this.descuentoAplicado);

    // Leer productos desde backend
    this.productoService.leerProductos().subscribe(data => {
      console.log("Productos obtenidos del backend:", data);

      this.productos = data.map(p => {
        p.disponible = Number(p.cantidad ?? 0);
        p.disponibleTexto = p.disponible > 0 ? 'sí' : 'no';
        p.cantidadSeleccionada = p.disponible > 0 ? 1 : 0;

        // Categorías permitidas según suscripción
        const categoriasPermitidas = this.categoriaPorSuscripcion[tipoSuscripcion] || [];

        if (suscripcionActiva && this.descuentoAplicado > 0 && categoriasPermitidas.includes(p.categoria.toLowerCase())) {
          p.precioConDescuento = +(p.precio * (1 - this.descuentoAplicado)).toFixed(2);
        } else {
          p.precioConDescuento = p.precio;
        }

        return p;
      });

      console.log("Productos procesados con descuento:", this.productos);
    });
  }

  incrementar(producto: any) {
    if (!producto.cantidadSeleccionada) producto.cantidadSeleccionada = 1;
    producto.cantidadSeleccionada = Math.min(producto.cantidadSeleccionada + 1, producto.disponible);
    console.log(`Incrementado ${producto.nombre}:`, producto.cantidadSeleccionada);
  }

  decrementar(producto: any) {
    if (!producto.cantidadSeleccionada) producto.cantidadSeleccionada = 1;
    producto.cantidadSeleccionada = Math.max(producto.cantidadSeleccionada - 1, 1);
    console.log(`Decrementado ${producto.nombre}:`, producto.cantidadSeleccionada);
  }

  agregarAlCarrito(producto: any, cantidad: number = 1) {
    const stock = producto.disponible ?? producto.cantidad ?? 0;
    if (cantidad <= 0) return;
    if (cantidad > stock) {
      alert('La cantidad solicitada supera el stock disponible');
      return;
    }

    const precioUsar = producto.precioConDescuento ?? producto.precio;
    console.log(`Agregando al carrito: ${producto.nombre}, cantidad: ${cantidad}, precio: ${precioUsar}`);

    const existente = this.carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += cantidad;
      existente.subtotal = existente.precio * existente.cantidad;
      existente.total = existente.subtotal * (1 + existente.iva);
      console.log("Producto ya en carrito, actualizado:", existente);
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
      console.log("Producto agregado al carrito:", producto.nombre);
    }

    producto.cantidadSeleccionada = 1;
  }

  eliminarDelCarrito(id: string) {
    console.log("Eliminando del carrito producto con id:", id);
    this.carrito = this.carrito.filter(p => p.id !== id);
    console.log("Carrito actualizado:", this.carrito);
  }

  actualizarCantidadCarrito(item: any, nuevaCantidad: number) {
    console.log(`Actualizando cantidad de ${item.nombre}:`, nuevaCantidad);
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
    console.log("Item actualizado:", item);
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
    console.log("Totales del carrito:", totales);
    return totales;
  }

  confirmarPedido() {
    const user = this.authService.getUsuario();
    if (!user?.id) {
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

    console.log("Confirmando pedido:", nuevoPedido);

    this.pedidosService.guardarPedido(nuevoPedido).subscribe({
      next: async () => {
        const actualizaciones = this.carrito.map(p =>
          this.pedidosService.actualizarStock(p.id, Math.max(0, p.disponible - p.cantidad))
        );
        await Promise.all(actualizaciones.map(req => lastValueFrom(req).catch(() => null)));

        alert('Pedido realizado exitosamente.');
        console.log("Pedido confirmado y stock actualizado");
        this.carrito = [];
        this.mostrarCarrito = false;
      },
      error: (err) => {
        console.error("Error al guardar pedido:", err);
        alert('Error al guardar pedido');
      }
    });
  }
}
