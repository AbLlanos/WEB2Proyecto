import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../components/cliente/formulario-cliente/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private API_CLIENTE = "https://web2proyecto-eb88f-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) { }

  leerCliente(): Observable<any> {
    return this.http.get<{ [key: string]: Cliente }>(`${this.API_CLIENTE}/clientes.json`);
  }

  guardarCliente(cliente: any): Observable<any> {
    return this.http.post(`${this.API_CLIENTE}/clientes.json`, cliente);
  }

  buscarClientebyId(id: string): Observable<any> {
    return this.http.get(`${this.API_CLIENTE}/clientes/${id}.json`);
  }

  eliminarCliente(id: string): Observable<any> {
    return this.http.delete(`${this.API_CLIENTE}/clientes/${id}.json`);
  }

  editarCliente(id: string, cliente: any): Observable<any> {
    return this.http.put(`${this.API_CLIENTE}/clientes/${id}.json`, cliente);
  }

  buscarClientePorCorreo(correo: string): Observable<any> {
    // Nota: orderBy y equalTo deben usarse así para consultas en Firebase Realtime Database REST API
    return this.http.get(`${this.API_CLIENTE}/clientes.json?orderBy="correoElectronico"&equalTo="${correo}"`);
  }
}
