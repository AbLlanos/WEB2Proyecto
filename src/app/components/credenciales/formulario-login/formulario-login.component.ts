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
  styleUrls: ['./formulario-login.component.css']
})
export class FormularioLoginComponent {

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
