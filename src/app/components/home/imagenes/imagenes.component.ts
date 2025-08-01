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
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC3E6QfvJ4C37HU9sUMAz4HqJh00mP2z0pGg&s'
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
