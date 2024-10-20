import { Component, Input } from '@angular/core';
import { RoomDto } from '../../../../model/room/room-dto';

@Component({
  selector: 'app-room-order-list-customer',
  templateUrl: './room-order-list-customer.component.html',
  styleUrl: './room-order-list-customer.component.scss'
})
export class RoomOrderListCustomerComponent {

  @Input({ required: true })
  room: RoomDto = {} as RoomDto
  
}
