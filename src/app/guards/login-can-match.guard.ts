import { CanMatchFn } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { inject } from '@angular/core';

export const loginCanMatchGuard: CanMatchFn = (route, segments) => {


  const authServicio = inject(AutenticacionService);
  return !authServicio.sessionIniciada();


};
