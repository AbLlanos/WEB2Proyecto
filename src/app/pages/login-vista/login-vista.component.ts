import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";
import { FormularioLoginComponent } from "../../components/credenciales/formulario-login/formulario-login.component";

@Component({
  selector: 'app-login-vista',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, FormularioLoginComponent],
  templateUrl: './login-vista.component.html',
  styleUrl: './login-vista.component.css'
})
export class LoginVistaComponent {

}
