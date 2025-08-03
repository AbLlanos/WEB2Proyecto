import { Component } from '@angular/core';
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { CarruselComponent } from "../../components/home/carrusel/carrusel.component";
import { FooterComponent } from "../../components/general/footer/footer.component";
import { HeroComponent } from "../../components/home/hero/hero.component";
import { MisionVisionComponent } from "../../components/mision-vision/mision-vision.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, CarruselComponent, FooterComponent, HeroComponent, MisionVisionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
