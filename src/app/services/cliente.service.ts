import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../components/cliente/formulario-cliente/cliente';

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private API_CLIENTE = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) {}

  leerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_CLIENTE, { withCredentials: true });
  }

  guardarCliente(cliente: any): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.API_CLIENTE}/guardar`, cliente, { withCredentials: true });
  }

  actualizarCliente(id: string, cliente: any): Observable<Cliente> { // <-- CAMBIO: id: string
    return this.http.put<Cliente>(`${this.API_CLIENTE}/actualizar/${id}`, cliente, { withCredentials: true });
  }

  eliminarCliente(id: string): Observable<void> { // <-- CAMBIO: id: string
    return this.http.delete<void>(`${this.API_CLIENTE}/eliminar/${id}`, { withCredentials: true });
  }

  buscarClientePorId(id: string): Observable<Cliente> { // <-- CAMBIO: id: string
    return this.http.get<Cliente>(`${this.API_CLIENTE}/${id}`, { withCredentials: true });
  }
}