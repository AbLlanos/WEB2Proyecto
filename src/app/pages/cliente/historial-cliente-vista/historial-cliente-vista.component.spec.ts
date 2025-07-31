import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialClienteVistaComponent } from './historial-cliente-vista.component';

describe('HistorialClienteVistaComponent', () => {
  let component: HistorialClienteVistaComponent;
  let fixture: ComponentFixture<HistorialClienteVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialClienteVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialClienteVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
