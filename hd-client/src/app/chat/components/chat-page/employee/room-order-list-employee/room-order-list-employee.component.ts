import { Component, Input } from '@angular/core';
import { RoomDto } from '../../../../model/room/room-dto';

@Component({
  selector: 'app-room-order-list-employee',
  templateUrl: './room-order-list-employee.component.html',
  styleUrl: './room-order-list-employee.component.scss'
})
export class RoomOrderListEmployeeComponent {

  @Input({ required: true })
  room: RoomDto = {} as RoomDto
  
}
