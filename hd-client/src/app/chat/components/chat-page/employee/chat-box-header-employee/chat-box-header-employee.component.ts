import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomDto } from '../../../../model/room/room-dto';

@Component({
  selector: 'app-chat-box-header-employee',
  templateUrl: './chat-box-header-employee.component.html',
  styleUrl: './chat-box-header-employee.component.scss'
})
export class ChatBoxHeaderEmployeeComponent {

  @Input({ required: true })
  room: RoomDto = {} as RoomDto

  @Input({ required: true })
  editRoomDialogEmployeeVisibility: boolean = false
 
  @Input({ required: true })
  transferRoomDialogEmployeeVisibility: boolean = false

  @Input({ required: true })
  closeRoomDialogEmployeeVisibility: boolean = false

  @Output()
  transferRoomDialogEmployeeVisibilityChange = new EventEmitter<boolean>()

  @Output()
  editRoomDialogEmployeeVisibilityChange = new EventEmitter<boolean>()
  
  @Output()
  closeRoomDialogEmployeeVisibilityChange = new EventEmitter<boolean>()

  constructor() {}

  editRoomVisibilityEmmit() {
    this.editRoomDialogEmployeeVisibilityChange.emit(true)
  }

  transferRoomVisibilityEmmit() {
    this.transferRoomDialogEmployeeVisibilityChange.emit(true)
  }

  closeRoomVisibilityEmmit() {
    this.closeRoomDialogEmployeeVisibilityChange.emit(true)
  }
}
