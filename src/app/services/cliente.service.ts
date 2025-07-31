import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../components/cliente/formulario-cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) {

  }

  private API_CLIENTE = "https://web2proyecto-eb88f-default-rtdb.firebaseio.com/";


  //Mostrar

  leerCliente(): Observable<any> {
    return this.http.get<{ [key: string]: Cliente }>(`${this.API_CLIENTE}/clientes.json`)
  }

  //Guardar
  guardarCliente(producto: any): Observable<any> {
    return this.http.post(`${this.API_CLIENTE}/clientes.json`, producto);
  }

  //BuscarPorId
  buscarClientebyId(id: string): Observable<any> {
    return this.http.get(`${this.API_CLIENTE}/clientes/${id}.json`)
  }

  //EliminarProducto
  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.API_CLIENTE}/clientes/${id}.json`)
  }

  //EditarProducto
  editarCliente(id: string, cliente: any): Observable<any> {
    return this.http.put(`${this.API_CLIENTE}/clientes/${id}.json`, cliente)
  }


}
