import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SectorDto } from '../../model/sector/sector-dto';
import { SectorDtoList } from '../../model/sector/sector-dto-list';
import { Pageable } from '../../../shared/model/pageable/pageable';
import { SectorService } from '../../services/sector.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDto } from '../../../auth/model/user-dto';
import { UserService } from '../../../auth/services/user.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SectorCreationDto } from '../../model/sector/sector-creation.dto';

@Component({
  selector: 'app-sectors-page',
  templateUrl: './sectors-page.component.html',
  styleUrl: './sectors-page.component.scss'
})
export class SectorsPageComponent implements OnInit {

  username: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' },
    { label: 'Lista de setores', url: '/chat/sectors' }
  ]

  tableValue: SectorDto[] = [] as SectorDto[]

  totalElements: number = 5
  rows: number = 5
  first: number = 0

  sortBy: string = 'description'
  direction: string = 'asc'
  queryDescription: string = ''
  queryCustomerName: string = ''
  queryEmployeeName: string = ''

  customersOptions: UserDto[] = {} as UserDto[]

  isAddSectorDialogVisible: boolean = false

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

  onSectorReport() {
    
  }

  onInfoSector(sector: SectorDto) {
    this._router.navigate([`chat/sector/info/${sector.key}`])
  }

  onEditSector(sector: SectorDto) {
    this._router.navigate([`chat/sector/edit/${sector.key}`])
  }

  async onDeleteSector(sector: SectorDto) {
    try {
      const user$ = this._sectorService.deleteById(sector.key)

      await firstValueFrom(user$)

      this.sectorsRequest()
      
      this.showSnackBar('Setor excluído com sucesso!', 'Ok!', 3000)
    } catch (err) {
      this.showSnackBar('Não foi possível excluir o setor. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async onCreateSector(sectorCreationDto: SectorCreationDto) {
    try {
      const sector$ = this._sectorService.save(sectorCreationDto)

      const sector = await firstValueFrom(sector$)

      this.showSnackBar('Setor salvo com sucesso!', 'Ok!', 3000)

      this._router.navigate([`chat/sector/info/${sector.key}`])
    } catch (err) {
      this.showSnackBar('Não foi possível salvar o setor. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
