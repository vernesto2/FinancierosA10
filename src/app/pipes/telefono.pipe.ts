import { Pipe, PipeTransform } from '@angular/core';
import { stringify } from 'querystring';

@Pipe({
  name: 'telefono'
})
export class TelefonoPipe implements PipeTransform {

  transform(telefono: number): string {
    var aux = '';
    aux.concat(telefono.toPrecision(1 - 4), '-', telefono.toPrecision(4 - 8));
    console.log(aux);
    return aux;
  }

}
