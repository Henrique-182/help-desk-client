import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPermission'
})
export class UserPermissionPipe implements PipeTransform {

  transform(value: string): string {
    return value === 'ADMIN' ? 'Administrador'
        : value === 'MANAGER' ? 'Gerente'
        : value === 'COMMON_USER' ? 'Comum'
        : 'Desconhecido'
  }

}
