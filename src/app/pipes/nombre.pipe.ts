import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre',
  standalone: true
})
export class NombrePipe implements PipeTransform {
  transform(value: string): string {
    return value ? value.toUpperCase() : '';
  }
}
