import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProductosVistaComponent } from './editar-productos-vista.component';

describe('EditarProductosVistaComponent', () => {
  let component: EditarProductosVistaComponent;
  let fixture: ComponentFixture<EditarProductosVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarProductosVistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarProductosVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
