import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';
import { MessageCreationDto } from '../../model/message/message-creation-dto';
import { MessageType } from '../../model/room/message-type-enum';
import { ScrollPanel } from 'primeng/scrollpanel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})
export class ChatBoxComponent {

  @ViewChild('sc') sc!: ScrollPanel

  @Input({ required: true })
  room: RoomDto = {} as RoomDto

  @Output('onSendTextMessage')
  onSendTextMessageEmitt = new EventEmitter<MessageCreationDto>()

  textMessage: string = ''

  constructor (
    private _snackBar: MatSnackBar
  ) {}

  onSendTextMessage() {

    if (this.textMessage.trim()) {
      const messageCreationDto: MessageCreationDto = {
        roomKey: this.room.key,
        type: MessageType.Text,
        content: this.textMessage
      }

      this.onSendTextMessageEmitt.emit(messageCreationDto)

      this.scrollBottom()
      this.textMessage = ''
      this.scrollBottom()
    } else {
      this.showSnackBar('Não é possível enviar mensagens vazias!', 'Ok!', 3000)
    }

    this.scrollBottom()
  }

  scrollBottom() {

    this.sc.scrollTop(99999)
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
