import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: string): string {

    return value === 'Adm' ? 'Administrator'
        : value === 'Employee' ? 'Funcionário'
        : value === 'Customer' ? 'Cliente'
        : 'Desconhecido'
  }

}
