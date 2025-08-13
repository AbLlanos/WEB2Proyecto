import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../components/empleado/formulario-empleado/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


    private API_EMPLEADO = "http://localhost:8080/empleados";

  constructor(private http: HttpClient) { }

  // Obtener todos los empleados
  leerEmpleado(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.API_EMPLEADO, { withCredentials: true });
  }

  // Guardar empleado
  guardarEmpleado(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(`${this.API_EMPLEADO}/guardarEmpleado`, empleado, { withCredentials: true });
  }

  // Buscar empleado por ID
  buscarEmpleadobyId(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.API_EMPLEADO}/${id}`, { withCredentials: true });
  }

  // Editar empleado
  editarEmpleado(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.API_EMPLEADO}/actualizar/${id}`, empleado, { withCredentials: true });
  }

  // Eliminar empleado
  eliminarEmpleado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_EMPLEADO}/eliminar/${id}`, { withCredentials: true });
  }

  // Buscar empleado por correo
  buscarEmpleadoPorCorreo(correo: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.API_EMPLEADO}/buscarPorCorreo?correo=${correo}`, { withCredentials: true });
  }




}
