import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuscripcionClienteComponent } from './suscripcion-cliente.component';

describe('SuscripcionClienteComponent', () => {
  let component: SuscripcionClienteComponent;
  let fixture: ComponentFixture<SuscripcionClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuscripcionClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuscripcionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
