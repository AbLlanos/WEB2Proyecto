import { Component } from '@angular/core';
import { PedidosService } from '../../../services/pedidos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../../general/nav-bar/nav-bar.component";

@Component({
  selector: 'app-historial-cliente',
  standalone: true,
  imports: [FormsModule, CommonModule, NavBarComponent],
  templateUrl: './historial-cliente.component.html',
  styleUrl: './historial-cliente.component.css'
})
export class HistorialClienteComponent {


  pedidosUsuario: any[] = [];

  constructor(private pedidosService: PedidosService) { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) return;

    this.pedidosService.obtenerHistorialUsuario(user.id).subscribe(data => {
      this.pedidosUsuario = Object.values(data || {});
      this.pedidosUsuario.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    });
  }

  trackById(index: number, item: any) {
    return item.id || index;
  }

}
