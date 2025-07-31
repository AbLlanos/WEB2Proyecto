import { Component } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";

@Component({
  selector: 'app-formulario-producto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './formulario-producto.component.html',
  styleUrl: './formulario-producto.component.css'
})
export class FormularioProductoComponent {

  constructor(private servicioProducto: ProductoService){}

    id:string = "";
    nombre: string = "";
    precio: number = 0;
    cantidad: number = 0;
    iva: number = 0.15;
    precioTotal: number = 0;
    ingredientes: string = "";
    categoria:string = "";
    img: string = "";
    disponible: string = "";

  agregarProducto(formulario:any)
  {
    this.servicioProducto.guardarProducto(formulario.value).subscribe(()=>
      window.location.reload()
    )
  }


}
