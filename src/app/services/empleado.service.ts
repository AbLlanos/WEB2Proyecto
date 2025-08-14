import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../components/empleado/formulario-empleado/empleado';


@Injectable({ providedIn: 'root' })
export class EmpleadoService {
  private API_EMPLEADO = 'http://localhost:8080/empleados';

  constructor(private http: HttpClient) { }

  leerEmpleados(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.API_EMPLEADO);
  }

  registrarEmpleado(empleado: any): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.API_EMPLEADO}/registroEmpleado`, empleado);
  }


  actualizarEmpleado(id: string, empleado: any): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.API_EMPLEADO}/actualizar/${id}`, empleado);
  }

  eliminarEmpleado(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_EMPLEADO}/eliminar/${id}`);
  }

  buscarEmpleadoPorId(id: string): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.API_EMPLEADO}/${id}`, { withCredentials: true });
  }

  buscarEmpleadoPorCorreo(correo: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.API_EMPLEADO}/buscarPorCorreo/${correo}`);
  }
}
