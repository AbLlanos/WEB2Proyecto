import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioProductoPageComponent } from './formulario-producto-page.component';

describe('FormularioProductoPageComponent', () => {
  let component: FormularioProductoPageComponent;
  let fixture: ComponentFixture<FormularioProductoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioProductoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioProductoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
