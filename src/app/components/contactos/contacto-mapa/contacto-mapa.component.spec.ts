import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoMapaComponent } from './contacto-mapa.component';

describe('ContactoMapaComponent', () => {
  let component: ContactoMapaComponent;
  let fixture: ComponentFixture<ContactoMapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactoMapaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactoMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
