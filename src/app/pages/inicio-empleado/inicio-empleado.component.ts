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
    if (!this.email || !this.password) return;

    const form = new FormData();
    form.append("correoElectronico", this.email);
    form.append("password", this.password);

    this.authServicio.loginFormData(form).subscribe({
      next: usuario => {
        // Guardar usuario en localStorage
        this.authServicio.guardarUsuarioSesion(usuario);

        // Mostrar en consola los datos recibidos
        console.log("Usuario recibido del backend:", usuario);

        // Mostrar lo que realmente se guarda en localStorage
        const userStorage = localStorage.getItem('user');
        console.log("Usuario guardado en localStorage:", userStorage);

        // Redirección según rol
        const redireccion = usuario.rol?.toUpperCase() === 'CLIENTE' ? "/perfilCliente" : "/perfilEmpleado";
        this.router.navigateByUrl(redireccion);
      },
      error: err => {
        console.error("Error en login:", err);
        this.error = "Credenciales incorrectas o error de servidor";
      }
    });



  }
}
