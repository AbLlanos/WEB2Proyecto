import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";  // Importa FormsModule
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-inicio-empleado',
  standalone: true,
  imports: [FormsModule, NavBarComponent, FooterComponent, RouterLink],
  templateUrl: './inicio-empleado.component.html',
  styleUrls: ['./inicio-empleado.component.css'],
})
export class InicioEmpleadoComponent {


  email: string = "";
  password: string = "";
  error: string = "";

  constructor(private authServicio: AutenticacionService, private router: Router) { }

  Login() {
    if (!this.email || !this.password) {
      this.error = "Debe ingresar correo y contraseña";
      return;
    }

    this.authServicio.LoginAuthenticacion(this.email, this.password).subscribe({
      next: (usuario) => {
        if (usuario) {
          // usuario debería incluir datos como { id, nombre, correo, rol }
          localStorage.setItem('user', JSON.stringify(usuario));

          const redireccion = localStorage.getItem("redirectUrl") ||
            (usuario.rol === 'cliente' ? "/perfilCliente" : "/perfilEmpleado");

          localStorage.removeItem("redirectUrl");
          this.router.navigateByUrl(redireccion);

        } else {
          this.error = "Credenciales incorrectas";
        }
      },
      error: (err) => {
        console.error("Error en login:", err);
        this.error = "Error al intentar iniciar sesión.";
      }
    });

  }
}