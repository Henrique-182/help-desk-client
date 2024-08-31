import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { RoomsList } from '../../data/room';
import { RoomService } from '../../services/room.service';
import { firstValueFrom } from 'rxjs';
import { RoomStatus } from '../../model/room/room-status-enum';
import { RoomDto } from '../../model/room/room-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageRoom } from '../../model/room/message-room';
import { MessageService } from '../../services/message.service';
import { MessageCreationDto } from '../../model/message/message-creation-dto';
import { UserRoom } from '../../model/room/user-room';
import { MessageDto } from '../../model/message/message-dto';
import { UserType } from '../../../auth/model/user-type-enum';

@Component({
  selector: 'app-chat-talk-page',
  templateUrl: './chat-talk-page.component.html',
  styleUrl: './chat-talk-page.component.scss'
})
export class ChatTalkPageComponent implements OnInit {
  
  username: string
  id: number

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' },
    { label: 'Escolha de Setor', url: '/chat/sector/select' }
  ]

  tabViewActiveIndex: number = 0

  openRooms: RoomDto[] = [] as RoomDto[]
  chattingRooms: RoomDto[] = [] as RoomDto[]
  pausedRooms: RoomDto[] = [] as RoomDto[]
  closedRooms: RoomDto[] = [] as RoomDto[]

  isRoomSelected: boolean = false
  selectedRoom: RoomDto = {} as RoomDto
  messages: MessageRoom[] = []

  constructor (
    private _route: ActivatedRoute,
    private _roomService: RoomService,
    private _messageService: MessageService,
    private _snackBar: MatSnackBar
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')
  }

  ngOnInit(): void {
    this.breadCrumbItems.push(
      { label: 'Setor', url: `/chat/talk/${this.id}` },
      { label: `${this.id}`}
    )

    this.onActiveIndexChange(0)
  }

  onActiveIndexChange(newIndex: number) {
    this.tabViewActiveIndex = newIndex
    
    if (this.tabViewActiveIndex === 0) {
      this.onFindChattingRoomsByEmployee()
    } else if (this.tabViewActiveIndex === 1) {
      this.onFindOpenRoomsByEmployee()
    } else if (this.tabViewActiveIndex === 2) {
      this.onFindPausedRoomsByEmployee()
    } else if (this.tabViewActiveIndex === 3) {
      this.onFindClosedRoomsByEmployee()
    }
  }

  onRoomClick(room: RoomDto) {
    
    if (this.isRoomSelected && this.selectedRoom.key === room.key) {
      this.isRoomSelected = false
        this.selectedRoom = {} as RoomDto
    } else {
      this.isRoomSelected = true
      this.selectedRoom = room
    }
  }

  async onFindOpenRoomsByEmployee() {
    try {
      const wrapper = await firstValueFrom(
        this._roomService
          .findBySector(this.id, [RoomStatus.Open])
      )

      this.openRooms = wrapper.rooms

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar salas em aberto. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }   
  }

  async onFindChattingRoomsByEmployee() {
    try {
      const wrapper = await firstValueFrom(
        this._roomService
          .findBySectorAndEmployee(this.id, [RoomStatus.Chatting, RoomStatus.Transferred])
      )

      this.chattingRooms = wrapper.rooms

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar salas em atendimento. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }   
  }

  async onFindPausedRoomsByEmployee() {
    try {
      const wrapper = await firstValueFrom(
        this._roomService
          .findBySectorAndEmployee(this.id, [RoomStatus.Paused])
      )

      this.pausedRooms = wrapper.rooms

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar salas pausadas. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }   
  }

  async onFindClosedRoomsByEmployee() {
    try {
      const wrapper = await firstValueFrom(
        this._roomService
          .findBySectorAndEmployee(this.id, [RoomStatus.Closed])
      )

      this.closedRooms = wrapper.rooms

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar salas fechadas. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }   
  }

  async onSendTextMessage(body: MessageCreationDto) {
    try {
      const messageDto: MessageDto = await firstValueFrom(
        this._messageService
          .create(body)
      )

      const userRoom: UserRoom = {
        key: 0,
        username: this.username,
        fullname: '',
        type: UserType.Employee,
        enabled: false
      }

      const messageRoom: MessageRoom = {
        key: messageDto.key,
        user: userRoom,
        type: messageDto.type,
        content: messageDto.content,
        createDatetime: messageDto.createDatetime,
        updateDatetime: messageDto.updateDatetime,
        deleteDatetime: messageDto.deleteDatetime
      }

      this.selectedRoom.messages.push(messageRoom)

    } catch (err) {
      this.showSnackBar('Não foi possível enviar a mensagem de texto. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }  
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
