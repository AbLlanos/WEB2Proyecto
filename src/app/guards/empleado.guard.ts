import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';

export const empleadoGuard: CanActivateFn = (route, state) => {
  const authServicio = inject(AutenticacionService);
  const router = inject(Router);

  if (authServicio.sessionIniciada() && authServicio.getUsuarioRol()?.toUpperCase() === 'EMPLEADO') {
    return true;
  } else {
    localStorage.setItem("redirectUrl", state.url);
    return router.parseUrl("/login");
  }
};

