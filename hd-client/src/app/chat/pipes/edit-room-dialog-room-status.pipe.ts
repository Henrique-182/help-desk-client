import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editRoomDialogRoomStatus'
})
export class EditRoomDialogRoomStatusPipe implements PipeTransform {

  transform(value: string): string {
    return value === 'Open' ? 'Aberto'
      : value === 'Chatting' ? 'Atendendo'
      : value === 'Paused' ? 'Pausado'
      : value === 'Transferred' ? 'Transferido'
      : 'Encerrado'
  }

}
