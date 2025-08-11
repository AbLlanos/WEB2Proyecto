import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";  // Importa FormsModule

@Component({
  selector: 'app-inicio-empleado',
  standalone: true,
  imports: [FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './inicio-empleado.component.html',
  styleUrls: ['./inicio-empleado.component.css'],
})
export class InicioEmpleadoComponent {
  usuario: string = '';
  password: string = '';
  error: string | null = null;

  loginEmpleado() {
    if (!this.usuario || !this.password) {
      this.error = 'Por favor complete todos los campos.';
      return;
    }
    this.error = null;
    // Lógica de autenticación real
    console.log('Login empleado con', this.usuario, this.password);
  }
}
