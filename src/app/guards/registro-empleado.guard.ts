import { CanDeactivateFn } from '@angular/router';
import { FormularioClienteComponent } from '../components/cliente/formulario-cliente/formulario-cliente.component';

export const registroEmpleadoGuard: CanDeactivateFn<FormularioClienteComponent> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  if (component.camposSinLlenar()) {
    return confirm("Tienes datos sin llenar. ¿Seguro quieres abandonar el registro?")
  } 
  
  return true;
};
