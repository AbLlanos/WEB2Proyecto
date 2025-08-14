import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';

export const empleadoGuard: CanActivateFn = (route, state) => {
  const authServicio = inject(AutenticacionService);
  const router = inject(Router);

  const rol = authServicio.getUsuarioRol()?.toUpperCase();
  const sesion = authServicio.sessionIniciada();

  console.log("Guard EMPLEADO -> Rol:", rol, "Sesion:", sesion);

  if (sesion && rol === 'EMPLEADO') {
    return true;
  } else {
    localStorage.setItem("redirectUrl", state.url);
    return router.parseUrl("/login");
  }
};
