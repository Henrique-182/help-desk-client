import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoomUpdateDto } from '../../model/room/room-update-dto';
import { RoomStatus } from '../../model/room/room-status-enum';

@Component({
  selector: 'app-close-room-dialog',
  templateUrl: './close-room-dialog.component.html',
  styleUrl: './close-room-dialog.component.scss'
})
export class CloseRoomDialogComponent {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Input({ required: true })
  room: RoomDto = {} as RoomDto
 
  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  onCloseRoomEmitt = new EventEmitter<RoomUpdateDto>()

  roomForm: FormGroup = this._formBuilder.group({
    reason: [],
    solution: []
  })

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  onShow() {

    this.roomForm = this._formBuilder.group({
      reason: new FormControl({ value: this.room.reason, disabled: false }),
      solution: new FormControl({ value: this.room.solution, disabled: false })
    })

  }

  onDialogVisibilityChange() {

    this.dialogVisibilityChange.emit(false)
  }

  onCloseRoom() {

    const roomUpdateDto: RoomUpdateDto = {
      status: RoomStatus.Closed,
      reason: this.roomForm.value.reason,
      solution: this.roomForm.value.solution
    }

    this.onCloseRoomEmitt.emit(roomUpdateDto)

  }

}
