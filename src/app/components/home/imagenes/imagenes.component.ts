import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-imagenes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent {
  cards = [
    {
      title: 'Nuestra Historia',
      description: 'Desde un pequeño restaurante en 1940 hasta ser el sabor favorito del mundo. En McDonald’s, cada historia comienza con una sonrisa.',
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.k_iJLpm5afJO-DaTshieGAHaFS?r=0&w=1920&h=1370&rs=1&pid=ImgDetMain&o=7&rm=3',
      showDescription: false
    },
    {
      title: 'Compromiso con la Comunidad',
      description: 'No solo servimos comida, también servimos esperanza. Apoyamos a familias, niños y comunidades a través de programas como Casa Ronald y más.',
      imageUrl: 'https://cdn-icons-png.flaticon.com/512/235/235861.png',
      showDescription: false
    },
    {
      title: 'Pasión por Innovar',
      description: 'Desde pedidos digitales hasta nuevos sabores irresistibles. Innovamos cada día para sorprenderte con lo mejor de McDonald’s.',
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.gi5uiyh6UMzZUr1odR4TggHaFJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
      showDescription: false
    }
  ];

  toggleDescription(index: number) {
    this.cards[index].showDescription = !this.cards[index].showDescription;
  }
}
