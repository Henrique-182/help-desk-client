import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuItem } from 'primeng/api';
import { RoomDto } from '../../../../model/room/room-dto';

@Component({
  selector: 'app-chat-box-footer-customer',
  templateUrl: './chat-box-footer-customer.component.html',
  styleUrl: './chat-box-footer-customer.component.scss'
})
export class ChatBoxFooterCustomerComponent {

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
    private _snackBar: MatSnackBar
  ) {}

  onOpenImageUploadDialogEmitt() {
    this.onOpenImageUploadDialog.emit(true)
  }
  
  onOpenVideoUploadDialogEmitt() {
    this.onOpenVideoUploadDialog.emit(true)
  }

  onOpenFileUploadDialogEmitt() {
    this.onOpenFileUploadDialog.emit(true)
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
