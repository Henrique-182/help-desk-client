import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RoomDto } from '../../../../model/room/room-dto';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chat-box-footer-employee',
  templateUrl: './chat-box-footer-employee.component.html',
  styleUrl: './chat-box-footer-employee.component.scss'
})
export class ChatBoxFooterEmployeeComponent {

  @Input({ required: true })
  room: RoomDto = {} as RoomDto

  @Output()
  onOpenImageUploadDialog = new EventEmitter<boolean>()

  @Output()
  onOpenVideoUploadDialog = new EventEmitter<boolean>()

  @Output()
  onOpenFileUploadDialog = new EventEmitter<boolean>()

  @Output()
  onSendTextMessage = new EventEmitter<string>()

  @Output()
  onEnterRoom = new EventEmitter<number>()

  @Output()
  onTranferRoom = new EventEmitter<number>()

  menuItems: MenuItem[] = [
    {
      label: 'Imagens',
      icon: 'pi pi-images',
      command: () => this.onOpenImageUploadDialogEmitt()
    },
    {
      label: 'Vídeos',
      icon: 'pi pi-video',
      command: () => this.onOpenVideoUploadDialogEmitt()
    },
    {
      label: 'Arquivos',
      icon: 'pi pi-file',
      command: () => this.onOpenFileUploadDialogEmitt()
    }
  ]

  textMessage: string = ''

  constructor(
    private _snackBar: MatSnackBar) {}

  onOpenImageUploadDialogEmitt() {
    this.onOpenImageUploadDialog.emit(true)
  }
  
  onOpenVideoUploadDialogEmitt() {
    this.onOpenVideoUploadDialog.emit(true)
  }

  onOpenFileUploadDialogEmitt() {
    this.onOpenFileUploadDialog.emit(true)
  }

  onEnterRoomEmitt() {
    this.onEnterRoom.emit(this.room.code)
  }

  onTransferRoomEmitt() {
    this.onTranferRoom.emit()
  }

  onSendTextMessageEmitt() {

    if (this.textMessage.trim()) {

      this.onSendTextMessage.emit(this.textMessage)

      this.textMessage = ''
    } else {
      this.showSnackBar('Não é possível enviar mensagens vazias!', 'Ok!', 3000)
    }

  }
  
  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
