import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { autenticaGuard } from './autentica.guard';

describe('autenticaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => autenticaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
