import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { ImagenesComponent } from "../../components/home/imagenes/imagenes.component";
import { FooterComponent } from "../../components/general/footer/footer.component";

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [NavBarComponent, ImagenesComponent, FooterComponent],
  templateUrl: './nosotros.component.html',
  styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

}
