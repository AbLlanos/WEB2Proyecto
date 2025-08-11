import { Component } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../general/footer/footer.component";

@Component({
  selector: 'app-historial-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent, FooterComponent],
  templateUrl: './historial-cliente.component.html',
  styleUrl: './historial-cliente.component.css'
})
export class HistorialClienteComponent {


  pedidosUsuario: any[] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) return;

    this.pedidosService.obtenerHistorialUsuario(user.id).subscribe(data => {
      this.pedidosUsuario = Object.entries(data || {}).map(([id, pedido]: any) => {
        const productosArray = Object.values(pedido.productos || {}).map((p: any) => {
          const cantidad = Number(p.cantidad) || 0;
          const precioUnitario = Number(p.precioUnitario) || 0;
          const iva = Number(p.iva) || 0;

          const precioPorCantidad = cantidad * precioUnitario;
          const ivaPagadoProducto = precioPorCantidad * iva;
          const subtotal = precioPorCantidad + ivaPagadoProducto;

          return {
            nombre: p.nombre || '',
            cantidad,
            precioUnitario,
            iva,
            precioPorCantidad,
            ivaPagadoProducto,
            subtotal
          };
        });

        const totalPedido = pedido.total
          ? Number(pedido.total)
          : productosArray.reduce((acc, prod) => acc + prod.subtotal, 0);

        const ivaPagadoTotal = productosArray.reduce((acc, prod) => acc + prod.ivaPagadoProducto, 0);
        const subtotalTotal = productosArray.reduce((acc, prod) => acc + prod.precioPorCantidad, 0);

        return {
          id,
          fecha: pedido.fecha || new Date().toISOString(),
          productos: productosArray,
          total: totalPedido,
          ivaPagadoTotal,
          subtotalTotal
        };
      });

      // Ordenar por fecha descendente
      this.pedidosUsuario.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      );
    });
  }

  trackById(index: number, item: any) {
    return item.id || index;
  }
}
