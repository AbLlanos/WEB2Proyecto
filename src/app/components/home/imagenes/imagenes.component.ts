import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <-- Importa CommonModule

@Component({
  selector: 'app-imagenes',
  standalone: true,
  imports: [CommonModule], // <-- Agrega CommonModule aquí
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent {
  cards = [
  {
    title: 'Nuestra Historia',
    description: 'Desde 1940, McDonald’s ha revolucionado la comida rápida con innovación y calidad.',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/McDonald%27s_Golden_Arches.svg/1200px-McDonald%27s_Golden_Arches.svg.png'
  },
  {
    title: 'Compromiso Social',
    description: 'Apoyamos a comunidades locales y fomentamos el desarrollo sostenible.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/235/235861.png'
  },
  {
    title: 'Innovación Constante',
    description: 'Nos esforzamos por mejorar siempre la experiencia y el sabor para nuestros clientes.',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/992/992651.png'
  },

];

}
