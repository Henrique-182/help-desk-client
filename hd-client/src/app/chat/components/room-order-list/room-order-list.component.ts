import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';

@Component({
  selector: 'app-room-order-list',
  templateUrl: './room-order-list.component.html',
  styleUrl: './room-order-list.component.scss'
})
export class RoomOrderListComponent {

  @Input({ required: true })
  rooms: RoomDto[] = [] as RoomDto[]

  @Input({ required: true })
  noRoomsMessage: string[] = [] as string[]

  @Output('onItemClick')
  onItemClickEmmit = new EventEmitter<RoomDto>()

  constructor(

  ) {}

  onItemClick(room: RoomDto) {
    this.onItemClickEmmit.emit(room)
  }

}
