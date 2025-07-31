import { Component } from '@angular/core';
import { HeroComponent } from "../../components/home/hero/hero.component";
import { CarruselComponent } from "../../components/home/carrusel/carrusel.component";
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";
import { FooterComponent } from "../../components/general/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CarruselComponent, NavBarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
