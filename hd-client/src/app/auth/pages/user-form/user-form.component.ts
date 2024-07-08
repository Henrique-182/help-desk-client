import { Component, OnInit } from '@angular/core';
import { FormAction } from '../../../shared/enums/form-action';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDto } from '../../model/user-dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserPermission } from '../../model/user-permission';
import { UserService } from '../../services/user.service';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  action: FormAction
  username: string

  userForm: FormGroup = this._formBuilder.group({
    username: [null],
    fullname: [null],
    accountNonExpired: [null],
    accountNonLocked: [null],
    credentialsNonExpired: [null],
    enabled: [null],
    permissions: [null]
  })
  isFormDisabled: boolean

  user: UserDto = {} as UserDto

  permissionsList: UserPermission[] = [
    { id: 1, description: 'Administrador', authority: 'ADMIN' },
    { id: 2, description: 'Gerente', authority: 'MANAGER' },
    { id: 3, description: 'Comum', authority: 'COMMON_USER' },
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
    this.isFormDisabled = (this.action === FormAction.Get || this.action === FormAction.Delete)
  }

  async ngOnInit() {
    await this.findUserById()
    this.setFormData()
  }

  private async findUserById(): Promise<void> {
    const id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')

    try {
      const user$ = this._userService.findById(id)
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
    this._router.navigate(['auth/user'])
  }

  async onDelete() {
    try {
      const user$ = this._userService.deleteById(this.user.key)

      await firstValueFrom(user$)
      
      this.showSnackBar('Usuário excluído com sucesso!', 'Ok!', 3000)

      this._router.navigate(['auth/user'])
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
