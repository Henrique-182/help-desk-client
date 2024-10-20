import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { RoomDto } from '../../model/room/room-dto';
import { MessageCreationDto } from '../../model/message/message-creation-dto';
import { MessageType } from '../../model/room/message-type-enum';
import { ScrollPanel } from 'primeng/scrollpanel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomUpdateDto } from '../../model/room/room-update-dto';
import { RoomStatus } from '../../model/room/room-status-enum';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { RoomCreationDto } from '../../model/room/room-creation-dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.scss'
})
export class ChatBoxComponent {

  @ViewChild('sc') sc!: ScrollPanel

  @Input({ required: true })
  room: RoomDto = {} as RoomDto

  @Output()
  onSendTextMessageEmitt = new EventEmitter<MessageCreationDto>()

  @Output()
  onSendImageEmitt = new EventEmitter<MessageCreationDto>()

  @Output()
  onEmployeeEnterChatEmitt = new EventEmitter<number>()

  @Output()
  onEditRoomEmitt = new EventEmitter<RoomUpdateDto>()

  @Output()
  onTransferRoomEmitt = new EventEmitter<RoomUpdateDto>()

  @Output()
  onCloseRoomEmitt = new EventEmitter<RoomUpdateDto>()

  uploadDialogVisibility: boolean = false
  editRoomDialogEmployeeVisibility: boolean = false
  transferRoomDialogEmployeeVisibility: boolean = false
  closeRoomDialogEmployeeVisibility: boolean = false

  htmlAccept: string = ''

  userType: string

  constructor (
    private _confirmationService: ConfirmationService,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.userType = this._route.snapshot.paramMap.get('type') || ''
  }

  onEnterRoom(code: number) {

    this.onEmployeeEnterChatEmitt.emit(code)
  }

  onCloseRoom(roomUpdateDto: RoomUpdateDto) {

    this._confirmationService.confirm({
      message: 'Deseja realmente encerrar a sala?',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      acceptLabel: "Sim",
      rejectIcon: "none",
      rejectLabel: "Não",
      rejectButtonStyleClass:"p-button-text",
      accept: () => {
        this.onCloseRoomEmitt.emit(roomUpdateDto)
      },
      reject: () => {
        this.showSnackBar('Usuário desistiu de encerrar a sala!', 'Ok!', 3000)
      }

    })

    this.closeRoomDialogEmployeeVisibility = false
  }

  onCallRoom() {
    this.showSnackBar('Ligação não implementada!', 'Ok!', 3000)
  }

  onEditRoom(roomUpdateDto: RoomUpdateDto) {

    this.onEditRoomEmitt.emit(roomUpdateDto)

    this.editRoomDialogEmployeeVisibility = false
  }

  onTransferRoom(roomUpdateDto: RoomUpdateDto) {

    this.onTransferRoomEmitt.emit(roomUpdateDto)

    this.transferRoomDialogEmployeeVisibility = false
  }

  onOpenTransferRoomDialog() {
    this.transferRoomDialogEmployeeVisibility = true
  }

  onOpenImageUploadDialog() {
    this.uploadDialogVisibility = true
    this.htmlAccept = 'image/*'
  }

  onOpenVideoUploadDialog() {
    this.uploadDialogVisibility = true
    this.htmlAccept = 'video/*'
  }

  onOpenFileUploadDialog() {
    this.uploadDialogVisibility = true
    this.htmlAccept = 'image/*, video/*, application/*, .ini, .xml, .7z, .rar, .war, .dll, .yml, .jar'
  }

  onTalkRoom() {
    this.showSnackBar('Áudio não implementado!', 'Ok!', 3000)
  }

  onSendTextMessage(message: string) {

    const messageCreationDto: MessageCreationDto = {
      roomKey: this.room.key,
      type: MessageType.Text,
      content: message
    }

    this.onSendTextMessageEmitt.emit(messageCreationDto)

    this.scrollBottom()
  }

  onSendImages(filesArray: File[]) {

    if (filesArray.length > 0) {
      filesArray.forEach(file => this.fileToBase64AndEmitt(file, MessageType.Image))
    }
    else {
      this.showSnackBar('Não é possível fazer upload sem informar imagens!', 'Ok!', 3000)
    }

    this.uploadDialogVisibility = false
  }

  onSendVideos(filesArray: File[]) {

    if (filesArray.length > 0) {
      filesArray.forEach(file => this.fileToBase64AndEmitt(file, MessageType.Video))
    }
    else {
      this.showSnackBar('Não é possível fazer upload sem informar vídeos!', 'Ok!', 3000)
    }

    this.uploadDialogVisibility = false
  }

  onSendFiles(filesArray: File[]) {

    if (filesArray.length > 0) {
      filesArray.forEach(file => this.fileToBase64AndEmitt(file, MessageType.File))
    }
    else {
      this.showSnackBar('Não é possível fazer upload sem informar arquivos!', 'Ok!', 3000)
    }

    this.uploadDialogVisibility = false
  }

  async fileToBase64AndEmitt(file: File, messageType: MessageType) {

    let reader = new FileReader()
    reader.readAsDataURL(file)
    
    reader.onload = () => {
      let fileBase64 = reader.result as string
      let filename: string = (messageType === MessageType.File ? `filename:${file.name};` : '')
      this.emittFileBase64(filename + fileBase64, messageType)
    }
    reader.onerror = (error) => {
      this.showSnackBar('Não foi possível fazer o upload. Tenta novamente mais tarde!', 'Ok!', 3000)
      console.log('Error: ', error)
    }
  }

  emittFileBase64(file: any, messageType: MessageType) {
    let messageCreationDto: MessageCreationDto = {
      roomKey: this.room.key,
      type: messageType,
      content: file
    }
    
    this.onSendImageEmitt.emit(messageCreationDto)
  }

  scrollBottom() {

    this.sc.scrollTop(99999)
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
