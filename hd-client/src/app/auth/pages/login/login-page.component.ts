import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup

  showPassword: boolean = false

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _authService: AuthService,
    private router: Router
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
    this._authService.signin(this.loginForm.value)
      .subscribe({
        next: (data) => {
          localStorage.setItem('accessToken', data.accessToken)
          localStorage.setItem('username', data.username)

          this.router.navigate(['/home/page'])
        },
        error: (error) => {
          const statusCode: number = error.status

          if (statusCode >= 400 && statusCode <= 499) {
            this.showSnackBar('Usuário/senha inválidos. Tente novamente!', 'Ok!', 3000)
          } else {
            this.showSnackBar('Login Falhou. Tente novamente mais tarde!', 'Ok!', 3000)
          }
        }
      })
  }

  onForgotPasswordSubmit() {
    this.showSnackBar('Esqueceu a senha não implementado!!!', 'Ok!', 3000)
  }
  
  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
