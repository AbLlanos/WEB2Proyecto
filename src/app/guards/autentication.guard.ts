import { CanActivateFn } from '@angular/router';

export const autenticationGuard: CanActivateFn = (route, state) => {
  return true;
};
