import { Component } from '@angular/core';
import { FormAction } from '../../../shared/enums/form-action';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDto } from '../../model/user-dto';
import { UserList } from '../../data/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  action: FormAction
  username: string

  userForm: FormGroup
  isFormDisabled: boolean

  user: UserDto = {} as UserDto

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
    this.action = this.toolbarText(this._router.url)
    this.isFormDisabled = (this.action === FormAction.Get || this.action === FormAction.Delete ? true : false)

    if (!(this.action === FormAction.Post)) {
      const id = Number.parseInt(this._route.snapshot.paramMap.get('id') || '0')
      this.user = UserList._embedded.userVOList[id - 1]

      this.userForm = this._formBuilder.group({
        id: new FormControl({ value: this.user.key, disabled: true }),
        username: new FormControl({ value: this.user.username, disabled: this.isFormDisabled }),
        fullname: new FormControl({ value: this.user.fullname, disabled: this.isFormDisabled }),
        accountNonExpired: new FormControl({ value: this.user.accountNonExpired, disabled: this.isFormDisabled }),
        accountNonLocked: new FormControl({ value: this.user.accountNonLocked, disabled: this.isFormDisabled }),
        credentialsNonExpired: new FormControl({ value: this.user.credentialsNonExpired, disabled: this.isFormDisabled }),
        enabled: new FormControl({ value: this.user.enabled, disabled: this.isFormDisabled }),
      })

    } else {
      this.userForm = this._formBuilder.group({
        id: [null],
        username: [null],
        fullname: [null],
        accountNonExpired: [null],
        accountNonLocked: [null],
        credentialsNonExpired: [null],
        enabled: [null],
      })
    }
  }

  private toolbarText(url: string): FormAction {

    return url.includes('info') ? FormAction.Get
        : url.includes('edit') ? FormAction.Put
        : url.includes('add') ? FormAction.Post
        :  FormAction.Delete
  }

  onEdit() {
    this._router.navigate([`auth/user/edit/${this.user.key}`])
  }

  onReturn() {
    this._router.navigate(['auth/user'])
  }

  onDelete() {
    this.showSnackBar('Exclusão não implementada!!!', 'Ok!', 3000)
  }

  onSave() {
    this.showSnackBar('Salvamento não implementado!!!', 'Ok!', 3000)
  }

  onCancel() {
    if (this.action === FormAction.Post) {
      this._router.navigate(['auth/user'])
    } else {
      this._router.navigate([`auth/user/info/${this.user.key}`])
    }
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
