import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';
import { RoomUpdateDto } from '../../model/room/room-update-dto';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SectorRoom } from '../../model/room/sector-room';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserRoom } from '../../model/room/user-room';
import { SectorService } from '../../services/sector.service';
import { Pageable } from '../../../shared/model/pageable/pageable';
import { RoomStatus } from '../../model/room/room-status-enum';

@Component({
  selector: 'app-transfer-room-dialog',
  templateUrl: './transfer-room-dialog.component.html',
  styleUrl: './transfer-room-dialog.component.scss'
})
export class TransferRoomDialogComponent {

  @Input({ required: true })
  dialogVisibility: boolean = false

  @Input({ required: true })
  room: RoomDto = {} as RoomDto

  @Output()
  dialogVisibilityChange = new EventEmitter<boolean>()

  @Output()
  onTransferRoomEmitt = new EventEmitter<RoomUpdateDto>()

  roomForm: FormGroup = this._formBuilder.group({
    sector: [],
    employee: []
  })

  sectorOptions: SectorRoom[] = []
  employeeOptions: UserRoom[] = []

  constructor(
    private _formBuilder: FormBuilder,
    private _sectorService: SectorService,
    private _snackBar: MatSnackBar
  ) {}

  async onShow() {
    
    await this.findSectors()
    await this.findEmployeesBySector(this.room.sector.key)

    this.roomForm = this._formBuilder.group({
      sector: new FormControl({ value: this.room.sector, disabled: false }),
      employee: new FormControl({ value: this.room.employee, disabled: false })
    })
  }

  async onChange() {
    this.roomForm = this._formBuilder.group({
      sector: new FormControl({ value: this.roomForm.value.sector, disabled: false }),
      employee: new FormControl({ value: null, disabled: false })
    })

    await this.findEmployeesBySector(this.roomForm.value.sector.key)
  }

  async findSectors() {
    try {
      const pageable: Pageable = {
        pageNumber: 0,
        pageSize: 10,
        sortBy: 'id',
        direction: 'asc'
      }

      this._sectorService.customPageable(pageable).subscribe(
        response => this.sectorOptions = response._embedded.sectorVOList.map(s => { return { key: s.key, description: s.description } })
      )

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar os setores. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async findEmployeesBySector(id: number) {
    try {
      this._sectorService.findUsersBySector("Employee", id).subscribe(
        response => this.employeeOptions = response.users.map(u => { return { key: u.key, username: u.username, type: { key: u.type.key, description: u.type.description } }  })
      )
    } catch (err) {
      this.showSnackBar('Não foi possível recuperar os funcionários. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  onHide() {

    this.dialogVisibilityChange.emit(false)
  }

  onTransferRoom() {

    const roomUpdateDto: RoomUpdateDto = {
      sectorKey: this.roomForm.value.sector.key,
      employeeKey: this.roomForm.value.employee.key,
      status: RoomStatus.Transferred
    }

    this.onTransferRoomEmitt.emit(roomUpdateDto)

  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
