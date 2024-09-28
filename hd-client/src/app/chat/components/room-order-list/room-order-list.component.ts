import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';
import { ActivatedRoute } from '@angular/router';

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

  userType: string

  selectedRooms: RoomDto[] = []

  constructor(
    private _route: ActivatedRoute
  ) {
    this.userType = this._route.snapshot.paramMap.get('type') || ''
  }

  onItemClick(room: RoomDto) {
    this.selectedRooms.pop()
    this.selectedRooms.push(room)
    this.onItemClickEmmit.emit(room)
  }

}
