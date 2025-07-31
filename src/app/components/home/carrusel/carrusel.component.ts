import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']
})
export class CarruselComponent {
  currentSlide = 0;

 slides = [
  {
    title: 'Sabor Clásico',
    description: 'Disfruta nuestra hamburguesa con papas frescas y ese toque rojo que te encanta.',
    url: 'https://www.mcdonaldspuebla.com/img/banner-promocions.png'
  },
  {
    title: 'Doble Placer',
    description: 'Una hamburguesa doble con papas y bebida, la combinación perfecta para tu antojo.',
    url: 'https://www.mcdonaldspuebla.com/img/banner-menu.png'
  },
  {
    title: 'Tu McDonald\'s Favorito',
    description: '"El símbolo que todos conocemos, un cielo azul y el sabor que amas. ¡Visítanos hoy!"',
    url: 'https://www.mcdonaldspuebla.com/img/banner-ubicacion.png'
  }
];


  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
