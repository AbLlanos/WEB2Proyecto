import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../components/productos/lista-productos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private API_PRODUCTOS = "http://localhost:8080/productos";

  constructor(private http: HttpClient) { }

  // Mostrar todos los productos
  leerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.API_PRODUCTOS, { withCredentials: true });
  }

  // Guardar producto
  guardarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.API_PRODUCTOS}/guardarProducto`, producto, { withCredentials: true });
  }

  // Buscar por ID
  buscarProductobyId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.API_PRODUCTOS}/${id}`, { withCredentials: true });
  }

  // Eliminar producto
  eliminarProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_PRODUCTOS}/eliminar/${id}`, { withCredentials: true });
  }

  // Editar producto
  editarProducto(id: string, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.API_PRODUCTOS}/actualizar/${id}`, producto, { withCredentials: true });
  }

}
