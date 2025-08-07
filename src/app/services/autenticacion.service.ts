import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {


  private API_BASEDATOS = 'https://web2proyecto-eb88f-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  LoginAuthenticacion(email: string, password: string): Observable<boolean> {
    const url = `${this.API_BASEDATOS}/clientes.json?orderBy="correoElectronico"&equalTo="${email}"`;

    return this.http.get<{ [key: string]: any }>(url).pipe(
      map(users => {
        console.log('Respuesta Firebase:', users);

        const keys = Object.keys(users || {});
        if (keys.length > 0) {
          const user = users[keys[0]];
          console.log("Email enviado:", email);
          console.log("URL generada:", url);
          if (user.password === password) {
            localStorage.setItem('user', JSON.stringify(user));
            return true;
          }
        }
        return false;
      })

    );


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


}
