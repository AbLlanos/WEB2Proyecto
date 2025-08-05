import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { registroEmpleadoGuard } from './registro-empleado.guard';
import { FormularioClienteComponent } from '../components/cliente/formulario-cliente/formulario-cliente.component';

describe('registroEmpleadoGuard', () => {
  const executeGuard: CanDeactivateFn<FormularioClienteComponent> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => registroEmpleadoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
