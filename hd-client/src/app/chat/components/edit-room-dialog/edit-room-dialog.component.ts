import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RoomUpdateDto } from '../../model/room/room-update-dto';

@Component({
  selector: 'app-edit-room-dialog',
  templateUrl: './edit-room-dialog.component.html',
  styleUrl: './edit-room-dialog.component.scss'
})
export class EditRoomDialogComponent {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Input({ required: true })
  room: RoomDto = {} as RoomDto

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  OnEditRoomEmitt = new EventEmitter<RoomUpdateDto>()

  roomForm: FormGroup = this._formBuilder.group({
    priority: [],
    reason: [],
    solution: []
  })

  priorityOptions = [
    { key: 1, description: 'Muito Alta' },
    { key: 2, description: 'Alta' },
    { key: 3, description: 'Normal' },
    { key: 4, description: 'Baixa' },
    { key: 5, description: 'Muito Baixa' },
  ]

  constructor(
    private _formBuilder: FormBuilder
  ) {}

  onShow() {

    this.roomForm = this._formBuilder.group({
      priority: new FormControl({ value: this.invertPriority(this.room.priority.description), disabled: false }),
      reason: new FormControl({ value: this.room.reason, disabled: false }),
      solution: new FormControl({ value: this.room.solution, disabled: false })
    })

  }

  onDialogVisibilityChange() {

    this.dialogVisibilityChange.emit(false)
  }

  onEditRoom() {

    const roomupdateDto: RoomUpdateDto = {
      reason: this.roomForm.value.reason,
      solution: this.roomForm.value.solution,
      priority: this.revertPriority(this.roomForm.value.priority.description)
    }
    
    this.OnEditRoomEmitt.emit(roomupdateDto)
  }

  invertPriority(priority: string) {
    return priority === 'Very High' ? { key: 1, description: 'Muito Alta' }
      : priority === 'High' ? { key: 2, description: 'Alta' }
      : priority === 'Normal' ? { key: 3, description: 'Normal' }
      : priority === 'Low' ? { key: 4, description: 'Baixa' }
      : { key: 5, description: 'Muito Baixa' }
  }

  private revertPriority(priority: string) {
    return priority === 'Muito Alta' ? 'Very High'
      : priority === 'Alta' ? 'High'
      : priority === 'Normal' ? 'Normal'
      : priority === 'Baixa' ? 'Low'
      : priority = 'Very Low'
  }

}
