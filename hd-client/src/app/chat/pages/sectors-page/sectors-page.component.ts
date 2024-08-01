import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SectorDto } from '../../model/sector-dto';
import { SectorDtoList } from '../../model/sector-dto-list';
import { Pageable } from '../../../shared/model/pageable/pageable';
import { SectorService } from '../../services/sector.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from '../../../auth/model/user-dto';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sectors-page',
  templateUrl: './sectors-page.component.html',
  styleUrl: './sectors-page.component.scss'
})
export class SectorsPageComponent implements OnInit {

  username: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' },
    { label: 'Listagem de Setores', url: '/chat/sectors' }
  ]

  tableValue: SectorDto[] = [] as SectorDto[]

  totalElements: number = 10
  rows: number = 10
  first: number = 0

  sortBy: string = 'description'
  direction: string = 'asc'
  queryDescription: string = ''
  queryCustomerName: string = ''
  queryEmployeeName: string = ''

  customersOptions: UserDto[] = {} as UserDto[]

  constructor (
    private _snackBar: MatSnackBar,
    private _sectorService: SectorService,
    private _router: Router
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  async ngOnInit() {
    this.sectorsRequest()
  }

  handlePageEvent(event: any) {
    this.first = event.first
    this.rows = event.rows

    this.sectorsRequest()
  }

  handleSortEvent(event: any) {
    this.sortBy = event.field
    this.direction = event.order === 1 ? 'asc' : 'desc'
    this.first = 0

    this.sectorsRequest()
  }

  onRefreshTable() {
    this.sectorsRequest()
  }

  onClearFilters() {
    this.queryDescription = ''
    this.queryCustomerName = ''
    this.queryEmployeeName = ''

    this.rows = 10
    this.first = 0

    this.sectorsRequest()
  }

  async sectorsRequest() {
    const pageable: Pageable = {
      pageNumber: Math.floor(this.first / this.rows),
      pageSize: this.rows,
      sortBy: this.sortBy,
      direction: this.direction,
      queryParams: new Map<string, string>([
        ['queryDescription', this.queryDescription],
        ['queryCustomerName', this.queryCustomerName],
        ['queryEmployeeName', this.queryEmployeeName]
      ])
    }

    this._sectorService.customPageable(pageable)
      .subscribe({
        next: (data: SectorDtoList) => {
          if (data.page.totalElements !== 0) {
            this.tableValue = data._embedded.sectorVOList

            this.totalElements = data.page.totalElements
          } else {
            this.tableValue = []
            this.rows = 0
            this.first = 0
            this.totalElements = 0
          }
        },
        error: (err) => {
          this.showSnackBar('Erro ao carregar setores. Tenta novamente mais tarde!', 'Ok!', 3000)
          console.log(err)
        }
      })
  }

  onAddSector() {

  }

  onSectorReport() {
    
  }

  onInfoSector(sector: SectorDto) {
    this._router.navigate([`chat/sector/info/${sector.key}`])
  }

  onEditSector(sector: SectorDto) {
    this._router.navigate([`chat/sector/edit/${sector.key}`])
  }

  onDeleteSector(sector: SectorDto) {

  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
