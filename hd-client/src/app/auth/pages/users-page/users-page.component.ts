import { Component, OnInit, signal } from '@angular/core';
import { UserDto } from '../../model/user-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Pageable } from '../../../shared/model/pageable/pageable';
import { UserDtoList } from '../../model/user-dto-list';
import { firstValueFrom } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss'
})
export class UsersPageComponent implements OnInit {

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

  isAddUserDialogVisible: boolean = false

  userForm: FormGroup = this._formBuilder.group({
    username: [null],
    fullname: [null],
    password: [null]
  })

  constructor(
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _formBuilder: FormBuilder,
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
    this.isAddUserDialogVisible = true

    this.userForm = this._formBuilder.group({
      username: new FormControl(),
      fullname: new FormControl(),
      password: new FormControl()
    })
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

  async onSave() {

    try {
      const user$ = this._userService.save(this.userForm.value)

      const user = await firstValueFrom(user$)

      this.showSnackBar('Usuário salvo com sucesso!', 'Ok!', 3000)

      this._router.navigate([`auth/user/info/${user.key}`])
    } catch (err) {
      this.showSnackBar('Não foi possível salvar o usuário. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async onDeleteUser(user: UserDto) {
    try {
      const user$ = this._userService.deleteById(user.key)

      await firstValueFrom(user$)
      
      this.showSnackBar('Usuário excluído com sucesso!', 'Ok!', 3000)

      this.usersRequest()
    } catch (err) {
      this.showSnackBar('Não foi possível excluir o usuário. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
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

    this._userService.customPageable(pageable)
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
}
