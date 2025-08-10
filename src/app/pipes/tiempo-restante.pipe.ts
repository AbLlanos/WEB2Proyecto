import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoRestante',
  standalone: true
})
export class TiempoRestantePipe implements PipeTransform {
  transform(suscripcion: any): string {
    if (!suscripcion || !suscripcion.fechaActivacion) return 'No disponible';
    const fechaActivacion = new Date(suscripcion.fechaActivacion);
    const hoy = new Date();
    const duracionDias = 30; // ejemplo: suscripción válida 30 días
    const diferenciaMs = fechaActivacion.getTime() + duracionDias * 24 * 60 * 60 * 1000 - hoy.getTime();
    const diasRestantes = Math.ceil(diferenciaMs / (1000 * 60 * 60 * 24));
    if (diasRestantes <= 0) return 'Suscripción expirada';
    return `${diasRestantes} día(s) restante(s)`;
  }
}