import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from "../general/nav-bar/nav-bar.component";
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suscripcion-cliente',
  standalone: true,
  imports: [NavBarComponent, FormsModule, CommonModule],
  templateUrl: './suscripcion-cliente.component.html',
  styleUrls: ['./suscripcion-cliente.component.css']
})
export class SuscripcionClienteComponent implements OnInit {  // Cambié el nombre de la clase a SuscripcionClienteComponent
  tarjetaForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.tarjetaForm = this.fb.group({
      nombreTitular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      fechaExpiracion: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
    });
  }

  formatCardNumber() {
    let val = this.tarjetaForm.get('numeroTarjeta')?.value || '';
    val = val.replace(/\D/g, '');
    val = val.match(/.{1,4}/g)?.join(' ') || val;
    this.tarjetaForm.get('numeroTarjeta')?.setValue(val, { emitEvent: false });
  }

  formatExpiryDate() {
    let val = this.tarjetaForm.get('fechaExpiracion')?.value || '';
    val = val.replace(/\D/g, '');
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    this.tarjetaForm.get('fechaExpiracion')?.setValue(val, { emitEvent: false });
  }

  submitTarjeta() {
    if (this.tarjetaForm.valid) {
      console.log('Datos tarjeta:', this.tarjetaForm.value);
      alert('Tarjeta guardada con éxito');
    } else {
      this.tarjetaForm.markAllAsTouched();
    }
  }
}
