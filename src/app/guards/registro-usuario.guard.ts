import { CanDeactivateFn } from '@angular/router';

export const registroUsuarioGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
