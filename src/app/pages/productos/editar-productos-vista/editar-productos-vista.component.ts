import { Component } from '@angular/core';
import { NavBarComponent } from "../../../components/general/nav-bar/nav-bar.component";
import { FormularioProductoComponent } from "../../../components/productos/formulario-producto/formulario-producto.component";
import { FooterComponent } from "../../../components/general/footer/footer.component";
import { EditarProductosComponent } from "../../../components/productos/editar-productos/editar-productos.component";

@Component({
  selector: 'app-editar-productos-vista',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, EditarProductosComponent],
  templateUrl: './editar-productos-vista.component.html',
  styleUrl: './editar-productos-vista.component.css'
})
export class EditarProductosVistaComponent {

}
