import { Component } from '@angular/core';
import { FormAction } from '../../../shared/enums/form-action';
import { Router } from '@angular/router';
import { FormatWidth } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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

  user: UserDto = UserList._embedded.userVOList[1]

  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {

    this.username = localStorage.getItem('username') || 'usuário'
    this.action = this.toolbarText(this._router.url)
    this.isFormDisabled = this.changeFormDisabled(this.action)

    this.userForm = this._formBuilder.group({
      id: new FormControl( { value: this.user.key, disabled: true } ),
      username: new FormControl( { value: this.user.username, disabled: this.isFormDisabled } ),
      fullname: new FormControl( { value: this.user.fullname, disabled: this.isFormDisabled } ),
      accountNonExpired: new FormControl( { value: this.user.accountNonExpired, disabled: this.isFormDisabled } ),
      accountNonLocked: new FormControl( { value: this.user.accountNonLocked, disabled: this.isFormDisabled } ),
      credentialsNonExpired: new FormControl( { value: this.user.credentialsNonExpired, disabled: this.isFormDisabled } ),
      enabled: new FormControl( { value: this.user.enabled, disabled: this.isFormDisabled } ),
    })
  }

  private toolbarText(url: string): FormAction {
    // /auth/user/add -> add
    const action = url.substring(url.lastIndexOf('/') + 1)

    switch (action) {
      case 'info':
        return FormAction.Get
      case 'add':
        return FormAction.Post
      case 'edit':
        return FormAction.Put
      case 'delete':
        return FormAction.Delete
    }

    return FormAction.Get
  }

  private changeFormDisabled(action: FormAction): boolean {

    return (action === FormAction.Get || action === FormAction.Delete) ? true : false
  }

  onEdit() {
    this._router.navigate(['auth/user/edit'])
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
    this._router.navigate(['auth/user/info'])
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
