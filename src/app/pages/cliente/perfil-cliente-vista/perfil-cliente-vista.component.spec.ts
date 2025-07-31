import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilClienteVistaComponent } from './perfil-cliente-vista.component';

describe('PerfilClienteVistaComponent', () => {
  let component: PerfilClienteVistaComponent;
  let fixture: ComponentFixture<PerfilClienteVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilClienteVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilClienteVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
