import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";
import { ImagenesComponent } from "../../components/imagenes/imagenes.component";

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, ImagenesComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
