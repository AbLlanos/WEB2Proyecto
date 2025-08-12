import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from '../components/empleado/formulario-empleado/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {


  private API_EMPLEADO = "https://web2proyecto-eb88f-default-rtdb.firebaseio.com";

  constructor(private http: HttpClient) { }

  leerEmpleado(): Observable<any> {
    return this.http.get<{ [key: string]: Empleado }>(`${this.API_EMPLEADO}/empleados.json`);
  }

  guardarEmpleado(cliente: any): Observable<any> {
    return this.http.post(`${this.API_EMPLEADO}/empleados.json`, cliente);
  }

  buscarEmpleadobyId(id: string): Observable<any> {
    return this.http.get(`${this.API_EMPLEADO}/empleados/${id}.json`);
  }

  eliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.API_EMPLEADO}/empleados/${id}.json`);
  }

  editarEmpleado(id: string, cliente: any): Observable<any> {
    return this.http.put(`${this.API_EMPLEADO}/empleados/${id}.json`, cliente);
  }

  buscarEmpleadoPorCorreo(correo: string): Observable<any> {
    return this.http.get(`${this.API_EMPLEADO}/empleados.json?orderBy="correoElectronico"&equalTo="${correo}"`);
  }




}
