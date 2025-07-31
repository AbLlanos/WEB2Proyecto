import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProductosPageComponent } from './lista-productos-page.component';

describe('ListaProductosPageComponent', () => {
  let component: ListaProductosPageComponent;
  let fixture: ComponentFixture<ListaProductosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaProductosPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaProductosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
