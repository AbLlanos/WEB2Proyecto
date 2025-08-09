import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private API_BASEDATOS = 'https://web2proyecto-eb88f-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  guardarPedidoUsuario(idUsuario: string, pedido: any) {
    return this.http.post(`${this.API_BASEDATOS}/clientes/${idUsuario}/pedidos.json`, pedido);
  }

  guardarPedidoGlobal(pedido: any): Observable<any> {
    return this.http.post(`${this.API_BASEDATOS}/pedidos.json`, pedido);
  }

  actualizarStock(idProducto: string, nuevaCantidad: number): Observable<any> {
    return this.http.patch(`${this.API_BASEDATOS}/productos/${idProducto}.json`, { cantidad: nuevaCantidad });
  }

obtenerHistorialUsuario(idUsuario: string) {
  return this.http.get(`${this.API_BASEDATOS}/pedidos.json?orderBy="idUsuario"&equalTo="${idUsuario}"`);
}

  
}