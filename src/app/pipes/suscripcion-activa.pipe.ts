import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'suscripcionActiva',
  standalone: true
})
export class SuscripcionActivaPipe implements PipeTransform {
  transform(suscripcion: any): string {
    if (!suscripcion) return 'Inactiva';
    return suscripcion.activa ? `Activada - ${suscripcion.tipoSuscripcion}` : 'Inactiva';
  }
}
