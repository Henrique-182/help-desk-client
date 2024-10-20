import { Component, Input } from '@angular/core';
import { RoomDto } from '../../../../model/room/room-dto';

@Component({
  selector: 'app-chat-box-header-customer',
  templateUrl: './chat-box-header-customer.component.html',
  styleUrl: './chat-box-header-customer.component.scss'
})
export class ChatBoxHeaderCustomerComponent {

  @Input({ required: true })
  room: RoomDto = {} as RoomDto
}
