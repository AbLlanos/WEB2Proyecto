import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private API_BASEDATOS = 'http://localhost:8080';

  // BehaviorSubject para reactividad
  private _usuario$ = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || 'null'));
  usuario$ = this._usuario$.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // Login usando JSON
  loginAutenticacion(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API_BASEDATOS}/api/login`, { correoElectronico: email, password });
  }

  loginFormData(form: FormData): Observable<any> {
    return this.http.post(`${this.API_BASEDATOS}/api/login`, form, { withCredentials: true });
  }

  // Guardar usuario y notificar cambios
  guardarUsuarioSesion(usuario: any) {
    localStorage.setItem('user', JSON.stringify(usuario));
    this._usuario$.next(usuario);
  }

  // Verifica si hay sesión iniciada
  sessionIniciada(): boolean {
    return !!this._usuario$.value;
  }

  // Cierra sesión
  logOut(): void {
    this.http.post(`${this.API_BASEDATOS}/api/logout`, {}, { withCredentials: true, responseType: 'text' })
      .subscribe({
        next: () => {
          localStorage.removeItem('user');
          this._usuario$.next(null);
          this.router.navigate(['/login']);
        },
        error: err => console.error("Error en logout:", err)
      });
  }

  // Obtener email del usuario desde BehaviorSubject
  getUsuarioEmail(): string | null {
    const user = this._usuario$.value;
    if (!user) return null;
    return user.email || user.correoElectronico || null;
  }

  // Obtener rol del usuario desde BehaviorSubject
  getUsuarioRol(): string | null {
    const user = this._usuario$.value;
    if (!user) return null;
    if (user.rol) return user.rol;
    if (user.roles && Array.isArray(user.roles) && user.roles.length > 0)
      return user.roles[0];
    return null;
  }

  getUsuarioId(): string | null {
    const user = this._usuario$.value;
    if (!user) return null;
    return user.id?.toString() || null;
  }

  getUsuario(): any {
    return this._usuario$.value;
  }

}
