import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";
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

    this.authServicio.loginAutenticacion(this.email, this.password).subscribe({
      next: (response: any) => {
        // Spring Security normalmente devuelve 200 OK y cookies de sesión
        if (response.status === 200) {
          // Guardar información del usuario manualmente (opcional)
          const usuario = {
            correoElectronico: this.email,
            rol: "EMPLEADO" // o ajusta según tu lógica en Spring
          };
          this.authServicio.guardarUsuarioSesion(usuario);

          const redireccion = localStorage.getItem("redirectUrl") || "/perfilEmpleado";
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
