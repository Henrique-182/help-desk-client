import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SectorRoom } from '../../../../model/room/sector-room';
import { UserRoom } from '../../../../model/room/user-room';
import { Pageable } from '../../../../../shared/model/pageable/pageable';
import { SectorService } from '../../../../services/sector.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RoomCreationDto } from '../../../../model/room/room-creation-dto';

@Component({
  selector: 'app-add-room-dialog-employee',
  templateUrl: './add-room-dialog-employee.component.html',
  styleUrl: './add-room-dialog-employee.component.scss'
})
export class AddRoomDialogEmployeeComponent {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  onAddRoomEmitt = new EventEmitter<RoomCreationDto>()

  id: number

  roomForm: FormGroup = this._formBuilder.group({
    customer: [],
    priority: [],
    reason: []
  })

  priorityOptions = [
    { key: 1, description: 'Very High', value: 'Muito Alta' },
    { key: 2, description: 'High', value: 'Alta' },
    { key: 3, description: 'Normal', value: 'Normal' },
    { key: 4, description: 'Low', value: 'Baixa' },
    { key: 5, description: 'Very Low', value: 'Muito Baixa' },
  ]

  customerOptions: UserRoom[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _sectorService: SectorService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')
  }

  async onShow() {

    this.roomForm = this._formBuilder.group({
      customer: [],
      priority: [],
      reason: []
    })

    await this.findCustomersBySector(this.id)
  }

  async onSectorChange() {

    await this.findCustomersBySector(this.roomForm.value.sector.key)
  }

  async findCustomersBySector(id: number) {
    try {
      this._sectorService.findUsersBySector("Customer", id).subscribe(
        response => this.customerOptions = response.users.map(u => { return { key: u.key, username: u.username, type: { key: u.type.key, description: u.type.description } }  })
      )
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar os clientes. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  onHide() {

    this.dialogVisibilityChange.emit(false)
  }

  onAddRoom() {

    const roomCreationDto: RoomCreationDto = {
      customerKey: this.roomForm.value.customer.key,
      sectorKey: this.id,
      priority: this.roomForm.value.priority.description
    }

    this.onAddRoomEmitt.emit(roomCreationDto)

  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }
  
}
