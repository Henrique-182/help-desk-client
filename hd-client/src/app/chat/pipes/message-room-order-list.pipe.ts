import { Pipe, PipeTransform } from '@angular/core';
import { MessageRoom } from '../model/room/message-room';
import { MessageType } from '../model/room/message-type-enum';

@Pipe({
  name: 'messageRoomOrderList'
})
export class MessageRoomOrderListPipe implements PipeTransform {

  transform(message: MessageRoom): string {

    let type = message?.type
    let returningMessage: string = 'Mensagem desconhecida.....'

    if (type === "TEXT") {
      let content = message.content

      if (content.length > 28) returningMessage = content.substring(0, 28) + '...'
      else returningMessage = content
    } else if (type === "IMAGE") {
      returningMessage = 'Imagem'
    } else if (type === "AUDIO") {
      returningMessage = 'Áudio'
    } else if (type === "VIDEO") {
      returningMessage = 'Vídeo'
    } else if (type === "FILE") {
      returningMessage = 'Arquivo'
    }

    return returningMessage
  }

}
