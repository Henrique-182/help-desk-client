import { Component, OnInit } from '@angular/core';
import { FormAction } from '../../../shared/enums/form-action';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDto } from '../../model/user-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPermission } from '../../model/user-permission';
import { UserService } from '../../services/user.service';
import { firstValueFrom } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { UserTypeDto } from '../../model/user-type-dto';

@Component({
  selector: 'app-manage-user-page',
  templateUrl: './manage-user-page.component.html',
  styleUrl: './manage-user-page.component.scss'
})
export class ManageUserPageComponent implements OnInit {

  id: number = 0
  action: FormAction
  username: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Lista de usuários', url: '/auth/users' },
  ]

  userForm: FormGroup = this._formBuilder.group({
    username: [null],
    fullname: [null],
    accountNonExpired: [null],
    accountNonLocked: [null],
    credentialsNonExpired: [null],
    enabled: [null],
    permissions: [null],
    type: [null]
  })
  isFormDisabled: boolean

  user: UserDto = {} as UserDto

  permissionsList: UserPermission[] = [
    { id: 1, description: 'Administrador', authority: 'ADMIN' },
    { id: 2, description: 'Gerente', authority: 'MANAGER' },
    { id: 3, description: 'Comum', authority: 'COMMON_USER' },
  ]

  types: UserTypeDto[] = [
    { key: 1, description: "Administrador" },
    { key: 2, description: "Funcionário" },
    { key: 3, description: "Cliente" }
  ]

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _userService: UserService
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
    this.action = this.toolbarText(this._router.url)
    this.isFormDisabled = this.action === FormAction.Get
    this.id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')

    this.breadCrumbItems.push(
      this.isFormDisabled ? { label: 'Info', url: `/auth/user/info/${this.id}` } : { label: 'Edição', url: `/auth/user/edit/${this.id}` },
      { label: `${this.id}`}
    )
  }

  async ngOnInit() {
    await this.findUserById()
    this.setFormData()
  }

  private async findUserById(): Promise<void> {
    try {
      const user$ = this._userService.findById(this.id)
      this.user = await firstValueFrom(user$)
      
      this.user.permissions.forEach((p) => {
        if (p.description === 'ADMIN') {
          p.description = 'Administrador'
        }
        if (p.description === 'MANAGER') {
          p.description = 'Gerente'
        }
        if (p.description === 'COMMON_USER') {
          p.description = 'Comum'
        }
      })

      if (this.user.type.description === 'Adm') this.user.type.description = 'Administrador'  
      else if (this.user.type.description === 'Employee') this.user.type.description = 'Funcionário' 
      else this.user.type.description = 'Cliente'

    } catch (err) {
      this.showSnackBar('Não foi possível recuperar o usuário. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  private async setFormData() {
    this.userForm = this._formBuilder.group({
      username: new FormControl({ value: this.user.username, disabled: true }),
      fullname: new FormControl({ value: this.user.fullname, disabled: this.isFormDisabled }),
      accountNonExpired: new FormControl({ value: this.user.accountNonExpired, disabled: this.isFormDisabled }),
      accountNonLocked: new FormControl({ value: this.user.accountNonLocked, disabled: this.isFormDisabled }),
      credentialsNonExpired: new FormControl({ value: this.user.credentialsNonExpired, disabled: this.isFormDisabled }),
      enabled: new FormControl({ value: this.user.enabled, disabled: this.isFormDisabled }),
      permissions: new FormControl({ value: this.user.permissions, disabled: this.isFormDisabled }),
      type: new FormControl({ value: this.user.type, disabled: true }) 
    })
  }

  private toolbarText(url: string): FormAction {

    return url.includes('info') ? FormAction.Get
      : url.includes('edit') ? FormAction.Put
        : FormAction.Delete
  }

  onEdit() {
    this._router.navigate([`auth/user/edit/${this.user.key}`])
  }

  onReturn() {
    this._router.navigate(['auth/users'])
  }

  async onDelete() {
    try {
      const user$ = this._userService.deleteById(this.user.key)

      await firstValueFrom(user$)
      
      this.showSnackBar('Usuário excluído com sucesso!', 'Ok!', 3000)

      this._router.navigate(['auth/users'])
    } catch (err) {
      this.showSnackBar('Não foi possível excluir o usuário. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }
  }

  async onSave() {
    try {
      const user = await firstValueFrom(
        this._userService
          .updateById(this.user.key, this.userForm.value)
      )

      this.showSnackBar('Usuário salvo com sucesso!', 'Ok!', 3000)

      this._router.navigate([`auth/user/info/${user.key}`])
    } catch (err) {
      this.showSnackBar('Não foi possível salvar o usuário. Tente novamente mais tarde!', 'Ok!', 3000)
      console.log(err);
    }   
  }

  onCancel() {
    this._router.navigate([`auth/user/info/${this.user.key}`])
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }
}
