import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private API_PEDIDOS = 'http://localhost:8080/pedidos';

  constructor(private http: HttpClient) {}

  // Guardar pedido en el backend
  guardarPedido(pedido: any): Observable<any> {
    return this.http.post(`${this.API_PEDIDOS}/guardar`, pedido, { withCredentials: true });
  }

  // Actualizar stock de producto (opcional: podrías moverlo a ProductoService)
  actualizarStock(idProducto: string, nuevaCantidad: number): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/productos/actualizarStock/${idProducto}`,
      { cantidad: nuevaCantidad },
      { withCredentials: true }
    );
  }

  // Obtener historial de pedidos de un cliente
  obtenerHistorialUsuario(idCliente: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.API_PEDIDOS}/cliente/${idCliente}`, { withCredentials: true });
  }
}
