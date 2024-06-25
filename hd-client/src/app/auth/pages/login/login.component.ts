import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  showPassword: boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) {
    this.loginForm = this._formBuilder.group({
      username: [null],
      password: [null]
    })
  }

  ngOnInit(): void { }

  changePasswordVisibility() {
    this.showPassword = !this.showPassword
  }

  onLoginSubmit() {
    this.showSnackBar('Login não implementado!!!', 'Ok!', 3000)
  }

  onForgotPasswordSubmit() {
    this.showSnackBar('Esqueceu a senha não implementado!!!', 'Ok!', 3000)
  }
  
  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
