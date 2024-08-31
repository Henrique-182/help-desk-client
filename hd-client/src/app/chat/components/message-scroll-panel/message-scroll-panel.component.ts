import { Component, Input } from '@angular/core';
import { MessageRoom } from '../../model/room/message-room';

@Component({
  selector: 'app-message-scroll-panel',
  templateUrl: './message-scroll-panel.component.html',
  styleUrl: './message-scroll-panel.component.scss'
})
export class MessageScrollPanelComponent {

  username: string

  @Input({ required: true })
  message: MessageRoom = {} as MessageRoom

  constructor () {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

}
