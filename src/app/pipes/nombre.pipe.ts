import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre',
  standalone: true
})
export class NombrePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
