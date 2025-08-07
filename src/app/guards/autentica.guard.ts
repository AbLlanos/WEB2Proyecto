import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

export const autenticaGuard: CanActivateFn = (route, state) => {

  const authServicio = inject(AutenticacionService);
  const router = inject(Router);

  if (authServicio.sessionIniciada()) {
    return true;
  } else {
    localStorage.setItem("redirectUrl", state.url)

    return router.parseUrl("/login")
  }

};
