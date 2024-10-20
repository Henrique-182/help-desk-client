import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RoomCreationDto } from '../../../../model/room/room-creation-dto';
import { UserRoom } from '../../../../model/room/user-room';
import { SectorService } from '../../../../services/sector.service';

@Component({
  selector: 'app-add-room-dialog-customer',
  templateUrl: './add-room-dialog-customer.component.html',
  styleUrl: './add-room-dialog-customer.component.scss'
})
export class AddRoomDialogCustomerComponent {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  onAddRoomEmitt = new EventEmitter<RoomCreationDto>()

  id: number

  roomForm: FormGroup = this._formBuilder.group({
    reason: []
  })

  customerOptions: UserRoom[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) {
    
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')
  }

  async onShow() {

    this.roomForm = this._formBuilder.group({
      reason: []
    })

  }

  onHide() {

    this.dialogVisibilityChange.emit(false)
  }

  onAddRoom() {

    const roomCreationDto: RoomCreationDto = {
      sectorKey: this.id
    }

    this.onAddRoomEmitt.emit(roomCreationDto)
  }
  
}
