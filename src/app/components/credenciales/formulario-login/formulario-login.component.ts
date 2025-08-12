import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../../services/autenticacion.service';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../general/footer/footer.component";

@Component({
  selector: 'app-formulario-login',
  standalone: true,
  imports: [RouterLink, FormsModule, NavBarComponent, FooterComponent],
  templateUrl: './formulario-login.component.html',
  styleUrl: './formulario-login.component.css'
})
export class FormularioLoginComponent {

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
