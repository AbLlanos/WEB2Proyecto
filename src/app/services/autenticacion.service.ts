import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {


  private API_BASEDATOS = 'https://web2proyecto-eb88f-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  LoginAuthenticacion(email: string, password: string) {
    return new Observable<any>((observer) => {
      this.http.get('https://web2proyecto-eb88f-default-rtdb.firebaseio.com/clientes.json').subscribe((clientes: any) => {
        const cliente = Object.keys(clientes || {}).map(key => ({ id: key, ...clientes[key] }))
          .find(u => u.correoElectronico === email && u.password === password);

        if (cliente) {
          cliente.rol = 'cliente';
          observer.next(cliente);
          observer.complete();
          return;
        }

        this.http.get('https://web2proyecto-eb88f-default-rtdb.firebaseio.com/empleados.json'
        ).subscribe((empleados: any) => {
          const empleado = Object.keys(empleados || {}).map(key => ({ id: key, ...empleados[key] }))
            .find(u => u.correoElectronico === email && u.password === password);

          if (empleado) {
            empleado.rol = 'empleado';
            observer.next(empleado);
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      });
    });
  }


  RegistrarUsuario(nuevoUsuario: any): Observable<any> {
    return this.http.post(this.API_BASEDATOS, nuevoUsuario);
  }


  obtenerUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.API_BASEDATOS);
  }


  sessionIniciada(): boolean {
    return localStorage.getItem("user") !== null;
  }

  logOut(): void {
    localStorage.removeItem("user");
  }

  getUsuarioEmail(): string | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);
      return user.correoElectronico || null;
    } catch {
      return null;
    }








  }


  getUsuarioRol(): string | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      const user = JSON.parse(userStr);
      return user.rol || null;
    } catch {
      return null;
    }
  }


}
