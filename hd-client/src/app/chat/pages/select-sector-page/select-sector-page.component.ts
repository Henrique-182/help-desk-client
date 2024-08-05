import { Component, OnInit } from '@angular/core';
import { SectorService } from '../../services/sector.service';
import { MenuItem } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleSectorWrapperDto } from '../../model/simple-sector-wrapper-dto';
import { SimpleSectorDto } from '../../model/simple-sector-dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-sector-page',
  templateUrl: './select-sector-page.component.html',
  styleUrl: './select-sector-page.component.scss'
})
export class SelectSectorPageComponent implements OnInit {

  username: string

  sectors: SimpleSectorDto[] = [] as SimpleSectorDto[]

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' },
    { label: 'Escolha de Setor', url: '/chat/select/sector' }
  ]

  constructor (
    private _sectorService: SectorService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  ngOnInit(): void {
    this.sectorsRequest()
  }

  sectorsRequest() {
    this._sectorService.findSectorByUser()
      .subscribe({
        next: (data: SimpleSectorWrapperDto) => {
          if (data.sectors.length !== 0) {
            this.sectors = data.sectors
          } else {
            
          }
        },
        error: (err) => {
          this.showSnackBar('Erro ao carregar setores. Tenta novamente mais tarde!', 'Ok!', 3000)
          console.log(err)
        }
      })
  }

  onGoToChat(id: number) {
    this._router.navigate([`chat/talk/${id}`])
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
