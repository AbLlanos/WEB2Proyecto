import { Component } from '@angular/core';
import { NavBarComponent } from "../../../components/general/nav-bar/nav-bar.component";
import { FormularioProductoComponent } from "../../../components/productos/formulario-producto/formulario-producto.component";

@Component({
  selector: 'app-formulario-producto-page',
  standalone: true,
  imports: [NavBarComponent, FormularioProductoComponent],
  templateUrl: './formulario-producto-page.component.html',
  styleUrl: './formulario-producto-page.component.css'
})
export class FormularioProductoPageComponent {

}
