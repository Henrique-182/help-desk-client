import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { ChatDashboardService } from '../../services/chat-dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { RoomPriorityQuantityDto } from '../../model/dashboard/room-priority-quantity-dto';
import { SectorMonthQuantitiesDto } from '../../model/dashboard/sector-month-quantities-dto';
import { RoomEmployeeQuantityDto } from '../../model/dashboard/room-employee-quantity-dto';
import { RoomCustomerQuantityDto } from '../../model/dashboard/room-customer-quantity-dto';
import { RoomStatusQuantityDto } from '../../model/dashboard/room-status-quantity-dto';

@Component({
  selector: 'app-chat-dashboard-page',
  templateUrl: './chat-dashboard-page.component.html',
  styleUrl: './chat-dashboard-page.component.scss'
})
export class ChatDashboardPageComponent implements OnInit {

  username: string

  initialDate: string = '01-09-2024'
  endDate: string = '30-09-2024'

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' }
  ]

  chattingRooms: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  openRooms: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  pausedRooms: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  closedRooms: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  allRooms: BehaviorSubject<number> = new BehaviorSubject<number>(0)

  roomStatusQuantities: RoomStatusQuantityDto[] = []
  roomEmployeeQuantities: RoomEmployeeQuantityDto[] = []
  roomCustomerQuantities: RoomCustomerQuantityDto[] = []
  roomPriorityQuantities: RoomPriorityQuantityDto[] = []
  sectorMonthQuantities: SectorMonthQuantitiesDto[] = []

  dataRoomPriorityQuantities: any = {
    labels: ['Muito Alta', 'Alta', 'Normal', 'Baixa', 'Muito Baixa'],
    datasets: [
      { label: 'Prioridade', data: [], backgroundColor: ['red', 'green', 'purple', 'yellow', 'blue'] }
    ]
  }

  dataSectorMonthQuantities: any = {
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: []
  }

  dataRoomEmployeeQuantities: any = {
    labels: ['Funcionário'],
    datasets: []
  }

  dataRoomCustomerQuantities: any = {
    labels: ['Cliente'],
    datasets: []
  }

  optionsRoomPriorityQuantities: any = {
    plugins: {
      title: { display: true, text: 'Chamados por Prioridade' },
      legend: { position: 'bottom' }
    }
  }

  optionsSectorMonthQuantities = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        title: { display: true, text: 'Chamados por Setor' },
        tooltip: { mode: 'index', intersect: false },
        legend: { position: 'bottom' }
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true }
    }
  }

  optionsRoomEmployeeQuantities: any = {
    plugins: {
      title: { display: true, text: 'Chamados por Funcionário' },
      legend: { position: 'bottom' }
    },
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
        x: { grid: { drawBorder: true } },
        y: { grid: { drawBorder: true } }
    }
  }

  optionsRoomCustomerQuantities: any = {
    plugins: {
      title: { display: true, text: 'Chamados por Cliente' },
      legend: { position: 'bottom' }
    },
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    scales: {
        x: { grid: { drawBorder: true } },
        y: { grid: { drawBorder: true } }
    }
  }

  constructor(
    private _chatDashboardService: ChatDashboardService,
    private _config: PrimeNGConfig,
    private _snackBar: MatSnackBar
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  async ngOnInit() {
    this.breadCrumbItems.push(
      { label: 'Dashboard', url: `/chat/dashboard` }
    )

    this._config.setTranslation({
      apply: 'Aplicar',
      clear: 'Limpar',
      firstDayOfWeek: 0,
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
        'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      today: 'Hoje'
    })  

    await this.setPeriodFromToday()
    await this.onRefreshDashboard()
  }

  async setPeriodFromToday() {
    const today = new Date()

    this.initialDate = this.returnFormattedDate(
      new Date(today.setDate(today.getDate() - today.getDay())).toString()
    )
    this.endDate = this.returnFormattedDate(
      new Date(today.setDate(today.getDate() + 6)).toString()
    )
  }

  async onRefreshDashboard() {
    
    await this.onGetRoomStatusQuantity()
    await this.onGetRoomEmployeeQuantity()
    await this.onGetRoomCustomerQuantity()
    await this.onGetRoomPriorityQuantity()
    await this.onGetSectorMonthQuantities()
    
    await this.setRoomStatusQuantityChart()
    await this.setRoomEmployeeQuantityChart()
    await this.setRoomCustomerQuantityChart()
    await this.setRoomPriorityQuantityChart()
    await this.setSectorMonthQuantitiesChart()
  }

  async onGetRoomStatusQuantity() {
    try {

      const wrapper = await firstValueFrom(
        this._chatDashboardService 
          .roomStatusAndQuantities(this.returnFormattedDate(this.initialDate), this.returnFormattedDate(this.endDate))
      )

      this.roomStatusQuantities = wrapper.voList

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar as salas por status. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onGetRoomEmployeeQuantity() {
    try {

      const wrapper = await firstValueFrom(
        this._chatDashboardService 
          .roomEmployeeAndQuantity(this.returnFormattedDate(this.initialDate), this.returnFormattedDate(this.endDate))
      )

      this.roomEmployeeQuantities = wrapper.voList

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar as salas por atendente. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onGetRoomCustomerQuantity() {
    try {

      const wrapper = await firstValueFrom(
        this._chatDashboardService 
          .roomCustomerAndQuantity(this.returnFormattedDate(this.initialDate), this.returnFormattedDate(this.endDate))
      )

      this.roomCustomerQuantities = wrapper.voList

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar as salas por clientes. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onGetRoomPriorityQuantity() {
    try {

      const wrapper = await firstValueFrom(
        this._chatDashboardService 
          .roomPriorityAndQuantity(this.returnFormattedDate(this.initialDate), this.returnFormattedDate(this.endDate))
      )

      this.roomPriorityQuantities = wrapper.voList

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar as quantidades por prioridade das salas. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async onGetSectorMonthQuantities() {
    try {

      const wrapper = await firstValueFrom(
        this._chatDashboardService 
          .sectorMonthAndQuantities('2024')
      )

      this.sectorMonthQuantities = wrapper.voList

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar as quantidades de atendimentos mensais por setor. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err)
    }
  }

  async setRoomStatusQuantityChart() {

    this.chattingRooms.next(this.roomStatusQuantities.at(1)?.quantity! + this.roomStatusQuantities.at(3)?.quantity!)
    this.openRooms.next(this.roomStatusQuantities.at(0)?.quantity!)
    this.pausedRooms.next(this.roomStatusQuantities.at(2)?.quantity!)
    this.closedRooms.next(this.roomStatusQuantities.at(4)?.quantity!)
    this.allRooms.next(
      this.roomStatusQuantities.at(0)?.quantity! 
      + this.roomStatusQuantities.at(1)?.quantity!
      + this.roomStatusQuantities.at(2)?.quantity! 
      + this.roomStatusQuantities.at(3)?.quantity!
      + this.roomStatusQuantities.at(4)?.quantity!
    )
  }

  async setRoomEmployeeQuantityChart() {

    this.dataRoomEmployeeQuantities.datasets = []

    for (let i = 0; i < this.roomEmployeeQuantities.length; i++) {

      this.dataRoomEmployeeQuantities.datasets.push(
        { 
          label: this.roomEmployeeQuantities.at(i)?.username!, 
          data: [this.roomEmployeeQuantities.at(i)?.quantity] 
        }
      )
    }

    this.dataRoomEmployeeQuantities = {...this.dataRoomEmployeeQuantities}
  }

  async setRoomCustomerQuantityChart() {

    this.dataRoomCustomerQuantities.datasets = []

    for (let i = 0; i < this.roomCustomerQuantities.length; i++) {

      this.dataRoomCustomerQuantities.datasets.push(
        { 
          label: this.roomCustomerQuantities.at(i)?.username!, 
          data: [this.roomCustomerQuantities.at(i)?.quantity] 
        }
      )
    }

    this.dataRoomCustomerQuantities = {...this.dataRoomCustomerQuantities}
  }

  async setRoomPriorityQuantityChart() {

    this.dataRoomPriorityQuantities.datasets.at(0).data = []

    this.dataRoomPriorityQuantities.datasets.at(0).data.push(
      this.roomPriorityQuantities.at(0)?.quantity,
      this.roomPriorityQuantities.at(1)?.quantity,
      this.roomPriorityQuantities.at(2)?.quantity,
      this.roomPriorityQuantities.at(3)?.quantity,
      this.roomPriorityQuantities.at(4)?.quantity
    )

    this.dataRoomPriorityQuantities = {...this.dataRoomPriorityQuantities}
  }

  async setSectorMonthQuantitiesChart() {

    this.dataSectorMonthQuantities.datasets = []

    for (let i = 0; i < this.sectorMonthQuantities.length; i++) {

      this.dataSectorMonthQuantities.datasets[i] = {
        label: this.sectorMonthQuantities[i].sector,
        data: [
          this.sectorMonthQuantities[i].jan,
          this.sectorMonthQuantities[i].fev,
          this.sectorMonthQuantities[i].mar,
          this.sectorMonthQuantities[i].apr,
          this.sectorMonthQuantities[i].may,
          this.sectorMonthQuantities[i].jun,
          this.sectorMonthQuantities[i].jul,
          this.sectorMonthQuantities[i].aug,
          this.sectorMonthQuantities[i].sep,
          this.sectorMonthQuantities[i].oct,
          this.sectorMonthQuantities[i].nov,
          this.sectorMonthQuantities[i].dec,
        ]
      }

    }

    this.dataSectorMonthQuantities = {...this.dataSectorMonthQuantities}
  }

  private returnFormattedDate(date: string): string {

    const d: Date = new Date(date)

    return date.length <= 10 ? date 
        : d.getUTCDate() + '-' + (d.getUTCMonth() + 1) + '-' + d.getUTCFullYear()

  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
