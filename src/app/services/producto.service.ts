import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../components/productos/lista-productos/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) {

  }

  private API_PRODUCTOS = "https://web2proyecto-eb88f-default-rtdb.firebaseio.com";


  //Mostrar

  leerProductos(): Observable<any> {
    return this.http.get<{ [key: string]: Producto }>(`${this.API_PRODUCTOS}/productos.json`)
  }

  //Guardar
  guardarProducto(producto: any): Observable<any> {
    return this.http.post(`${this.API_PRODUCTOS}/productos.json`, producto);
  }

  //BuscarPorId
  buscarProductobyId(id: string): Observable<any> {
    return this.http.get(`${this.API_PRODUCTOS}/productos/${id}.json`)
  }

  //EliminarProducto
  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.API_PRODUCTOS}/productos/${id}.json`)
  }

  //EditarProducto
  editarProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.API_PRODUCTOS}/productos/${id}.json`, producto)
  }


}
