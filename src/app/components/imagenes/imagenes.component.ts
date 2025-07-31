import { Component } from '@angular/core';

@Component({
  selector: 'app-imagenes',
  standalone: true,
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent {
  cards = [
    {
      title: 'Nuestra Historia',
      description: 'Desde 1940, McDonald’s ha revolucionado la comida rápida con innovación y calidad.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/McDonalds_Logo.svg'
    },
    {
      title: 'Compromiso Social',
      description: 'Apoyamos a comunidades locales y fomentamos el desarrollo sostenible.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Innovación Constante',
      description: 'Nos esforzamos por mejorar siempre la experiencia y el sabor para nuestros clientes.',
      imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=60'
    },
    {
      title: 'Calidad Garantizada',
      description: 'Ingredientes seleccionados para ofrecer productos frescos y deliciosos.',
      imageUrl: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=60'
    }
  ];
}
