import { Component } from '@angular/core';
import { HeroComponent } from "../../components/home/hero/hero.component";
import { CarruselComponent } from "../../components/home/carrusel/carrusel.component";
import { NavBarComponent } from "../../components/general/nav-bar/nav-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, CarruselComponent, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
