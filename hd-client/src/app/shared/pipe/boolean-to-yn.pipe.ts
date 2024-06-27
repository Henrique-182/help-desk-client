import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToYn'
})
export class BooleanToYnPipe implements PipeTransform {

  transform(value: boolean): string {
    return value ? 'Sim' : 'Não'
  }

}
