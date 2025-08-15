import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

export const clienteGuard: CanActivateFn = (route, state) => {
  const authServicio = inject(AutenticacionService);
  const router = inject(Router);

  // Obtener rol desde localStorage y eliminar el prefijo "ROLE_"
  const rol = authServicio.getUsuarioRol()?.toUpperCase().replace('ROLE_', '');

  if (authServicio.sessionIniciada() && rol === 'CLIENTE') {
    return true;
  } else {
    localStorage.setItem("redirectUrl", state.url);
    return router.parseUrl("/login");
  }
};
