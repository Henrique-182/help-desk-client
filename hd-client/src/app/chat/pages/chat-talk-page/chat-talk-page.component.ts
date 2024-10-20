import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
import { UserTypeRoomDto } from '../../model/room/user-type-room-dto';
import { RoomUpdateDto } from '../../model/room/room-update-dto';
import { RoomCreationDto } from '../../model/room/room-creation-dto';

@Component({
  selector: 'app-chat-talk-page',
  templateUrl: './chat-talk-page.component.html',
  styleUrl: './chat-talk-page.component.scss'
})
export class ChatTalkPageComponent implements OnInit {
  
  username: string
  id: number
  userType: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' },
    { label: 'Escolha de Setor', url: '/chat/sector/select' }
  ]

  breadCrumbButtons: MenuItem[] = []

  addRoomDialogEmployeeVisibility: boolean = false
  addRoomDialogCustomerVisibility: boolean = false

  tabViewActiveIndex: number = 0

  openRooms: RoomDto[] = [] as RoomDto[]
  chattingRooms: RoomDto[] = [] as RoomDto[]
  pausedRooms: RoomDto[] = [] as RoomDto[]
  closedRooms: RoomDto[] = [] as RoomDto[]

  selectedRoom: RoomDto = {} as RoomDto

  constructor (
    private _route: ActivatedRoute,
    private _roomService: RoomService,
  private _messageService: MessageService,
  private _snackBar: MatSnackBar
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')
    this.userType = this._route.snapshot.paramMap.get('type') || ''

    this.breadCrumbButtons = [
      {
        label: 'Criar chamado',
        icon: 'pi pi-plus-circle',
        target: 'addRoomByEmployee',
        visible: (this.userType === 'employee')
      },
      {
        label: 'Criar chamado',
        icon: 'pi pi-plus-circle',
        target: 'addRoomByCustomer',
        visible: (this.userType === 'customer')
      }
    ]
  }

  ngOnInit(): void {
    this.breadCrumbItems.push(
      { label: 'Setor', url: `/chat/talk/${this.userType}/${this.id}` },
      { label: `${this.id}`}
    )

    this.onActiveIndexChange(0)
  }

  onBreadCrumbButtonClick(event: string) {
   if (event === 'addRoomByEmployee') this.addRoomDialogEmployeeVisibility = true
   else if (event === 'addRoomByCustomer') this.addRoomDialogCustomerVisibility = true
  }

  onActiveIndexChange(newIndex: number) {
    this.tabViewActiveIndex = newIndex

    this.selectedRoom = {} as RoomDto
    
    if (this.userType === 'employee') {
      if (this.tabViewActiveIndex === 0) {
        this.onFindChattingRoomsByEmployee()
      } else if (this.tabViewActiveIndex === 1) {
        this.onFindOpenRoomsByEmployee()
      } else if (this.tabViewActiveIndex === 2) {
        this.onFindPausedRoomsByEmployee()
      } else if (this.tabViewActiveIndex === 3) {
        this.onFindClosedRoomsByEmployee()
      }
    } else {
      if (this.tabViewActiveIndex === 0) {
        this.onFindChattingRoomsByCustomer()
      } else if (this.tabViewActiveIndex === 1) {
        this.onFindClosedRoomsByCustomer()
      }
    }
  }

  onRoomClick(room: RoomDto) {
    
    if (this.selectedRoom.key === room.key) {
      this.selectedRoom = {} as RoomDto
    } else {
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

  async onFindChattingRoomsByCustomer() {
    try {
      const wrapper = await firstValueFrom(
        this._roomService
          .findBySectorAndCustomerAndStatus(this.id, [RoomStatus.Chatting, RoomStatus.Transferred, RoomStatus.Open])
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
      console.log(err)
    }   
  }

  async onFindClosedRoomsByCustomer() {
    try {
      const wrapper = await firstValueFrom(
        this._roomService
          .findBySectorAndCustomerAndStatus(this.id, [RoomStatus.Closed])
      )

      this.closedRooms = wrapper.rooms

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar salas fechadas. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }  
  }
  
  async onAddRoomByCustomer(roomCreationDto: RoomCreationDto) {
    try {
      const roomDto: RoomDto = await firstValueFrom(
        this._roomService
          .createByCustomer(roomCreationDto)
      )
      
      this.addRoomDialogCustomerVisibility = false

      this.selectedRoom = {} as RoomDto
      
      this.chattingRooms.push(roomDto)

      this.onActiveIndexChange(0)

    } catch (err) {
      this.showSnackBar('Não foi possível criar a sala. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onAddRoomByEmployee(roomCreationDto: RoomCreationDto) {
    try {
      const roomDto: RoomDto = await firstValueFrom(
        this._roomService
          .createByEmployee(roomCreationDto)
      )
      
      this.addRoomDialogEmployeeVisibility = false

      this.selectedRoom = {} as RoomDto
      
      this.chattingRooms.push(roomDto)

      this.onActiveIndexChange(0)

    } catch (err) {
      this.showSnackBar('Não foi possível criar a sala. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onEmployeeEnterChat(code: number) {
    try {
      const roomDto: RoomDto = await firstValueFrom(
        this._roomService
          .employeeEnterRoomByCode(code)
      )

      this.openRooms = this.openRooms.filter(room => room !== this.selectedRoom)
      
      this.selectedRoom = {} as RoomDto

      this.onActiveIndexChange(0)


    } catch (err) {
      this.showSnackBar('Não foi possível entrar na conversa. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  } 

  async onEditRoom(roomUpdateDto: RoomUpdateDto) {
    try {
      const roomDto: RoomDto = await firstValueFrom(
        this._roomService
          .updateReasonAndSolutionAndPriority(this.selectedRoom.code, roomUpdateDto)
      )

      const index = this.chattingRooms.indexOf(this.selectedRoom)

      this.chattingRooms.splice(index, 1, roomDto)

      this.selectedRoom = roomDto

      this.showSnackBar('Sala editada com sucesso!', 'Ok!', 3000)

    } catch (err) {
      this.showSnackBar('Não foi possível alterar a sala. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onTransferRoom(roomUpdateDto: RoomUpdateDto) {
    try {
      const roomDto: RoomDto = await firstValueFrom(
        this._roomService
          .transferRoomByCode(this.selectedRoom.code, roomUpdateDto)
      )

      this.chattingRooms = this.chattingRooms.filter((room) => room !== this.selectedRoom)
      this.openRooms = this.openRooms.filter(room => room !== this.selectedRoom)

      this.selectedRoom = {} as RoomDto

      this.showSnackBar('Sala transferida com sucesso!', 'Ok!', 3000)

    } catch (err) {
      this.showSnackBar('Não foi possível transferir a sala. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onCloseRoom(roomUpdateDto: RoomUpdateDto) {
    try {
      const roomDto: RoomDto = await firstValueFrom(
        this._roomService
          .updateStatusByCode(this.selectedRoom.code, roomUpdateDto)
      )

      this.chattingRooms = this.chattingRooms.filter((room) => room !== this.selectedRoom)

      this.selectedRoom = {} as RoomDto

      this.showSnackBar('Sala encerrada com sucesso!', 'Ok!', 3000)

    } catch (err) {
      this.showSnackBar('Não foi possível encerrar a conversa. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onSendTextMessage(body: MessageCreationDto) {
    try {
      const messageDto: MessageDto = await firstValueFrom(
        this._messageService
          .create(body)
      )

      const userRoom: UserRoom = {
        key: messageDto.key,
        username: messageDto.user.username,
        type: {
          key: messageDto.user.type.key,
          description: messageDto.user.type.description
        }
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

  async onSendFile(messageCreationDto: MessageCreationDto) {
    try {
      const messageDto: MessageDto = await firstValueFrom(
        this._messageService
          .create(messageCreationDto)
      )

      console.log(messageDto);

      const userType: UserTypeRoomDto = {
        key: messageDto.user.type.key,
        description: messageDto.user.type.description
      }

      const userRoom: UserRoom = {
        key: messageDto.user.key,
        username: messageDto.user.username,
        type: userType
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
      this.showSnackBar('Não foi possível enviar o arquivo. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }  
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
