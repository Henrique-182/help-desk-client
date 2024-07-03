import { Component, OnInit } from '@angular/core';
import { UserDto } from '../../model/user-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Pageable } from '../../../shared/model/pageable/pageable';
import { UserDtoList } from '../../model/user-dto-list';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  tableValue: UserDto[] = [] as UserDto[]

  totalElements: number = 10
  rows: number = 10
  first: number = 0

  sortBy: string = 'username'
  direction: string = 'asc'
  queryUsername: string = ''
  queryPermission: string = ''

  username: string

  permissions: object[]

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _userService: UserService
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'

    this.permissions = [
      { label: 'Administrador', value: 'ADMIN' },
      { label: 'Gerente', value: 'MANAGER' },
      { label: 'Comum', value: 'COMMON_USER' },
    ]
  }

  ngOnInit(): void {
    this.usersRequest()
  }

  handlePageEvent(event: any) {
    this.first = event.first
    this.rows = event.rows

    this.usersRequest()
  }

  handleSortEvent(event: any) {
    this.sortBy = event.field
    this.direction = event.order === 1 ? 'asc' : 'desc'
    this.first = 0

    this.usersRequest()
  }

  getPermissionSeverity(permission: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {

    return permission === 'ADMIN' ? 'danger'
        : permission === 'MANAGER' ? 'warning'
        : permission === 'COMMON_USER' ? 'info'
        : 'contrast'
  }

  onMenuClick() {
    this.showSnackBar('Click do menu não implementado!!!', 'Ok!', 3000)
  }

  onAddUser() {
    this._router.navigate(['auth/user/add'])
  }

  onUserReport() {
    this.showSnackBar('Relatório de usuários não implementado!!!', 'Ok!', 3000)
  }

  onGetUser(user: UserDto) {
    this._router.navigate([`auth/user/info/${user.key}`])
  }

  onEditUser(user: UserDto) {
    this._router.navigate([`auth/user/edit/${user.key}`])
  }

  onDeleteUser(user: UserDto) {
    this.showSnackBar('Exclusão não implementada!!!', 'Ok!', 3000)
  }

  onRefreshTable() {
    this.usersRequest()
  }

  onClearFilters() {
    this.queryUsername = ''
    this.queryPermission = ''

    this.rows = 10
    this.first = 0

    this.usersRequest()
  }

  private usersRequest() {
    const accessToken = localStorage.getItem('accessToken') || ''
    const pageable: Pageable = {
      pageNumber: Math.floor(this.first / this.rows),
      pageSize: this.rows,
      sortBy: this.sortBy,
      direction: this.direction,
      queryParams: new Map<string, string>([
        ['name', this.queryUsername],
        ['permission', this.queryPermission]
      ])
    }

    this._userService.customPageable(accessToken, pageable)
      .subscribe({
        next: (data: UserDtoList) => {
          if (data.page.totalElements !== 0) {
            this.tableValue = data._embedded.userVOList

            this.totalElements = data.page.totalElements
          } else {
            this.tableValue = []
            this.rows = 0
            this.first = 0
            this.totalElements = 0
          }
        },
        error: (err) => {
          this.showSnackBar('Erro ao carregar usuários. Tenta novamente mais tarde!', 'Ok!', 3000)
          console.log(err)
        }
      })
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

  click(event: any) {
    console.log(event);
  }
}
