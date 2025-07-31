import { Component } from '@angular/core';
import { NavBarComponent } from "../../../components/general/nav-bar/nav-bar.component";
import { ListaProductosComponent } from "../../../components/productos/lista-productos/lista-productos.component";

@Component({
  selector: 'app-lista-productos-page',
  standalone: true,
  imports: [NavBarComponent, ListaProductosComponent],
  templateUrl: './lista-productos-page.component.html',
  styleUrl: './lista-productos-page.component.css'
})
export class ListaProductosPageComponent {

}
