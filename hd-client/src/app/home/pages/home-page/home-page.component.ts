import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

  username: string

  constructor (
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  onMenuClick() {
    
  }

  onGoToUsersPage() {
    this._router.navigate(['/auth/users'])
  }

  onGoToKnowledgePage() {
    this.showSnackBar('Base de conhecimento não implementada!!!', 'Ok!', 3000)
  }

  onGoToChatPage() {
    this.showSnackBar('Chat não implementado!!!', 'Ok!', 3000)
  }

  onGoToReportsPage() {
    this.showSnackBar('Relatórios não implementado!!!', 'Ok!', 3000)
  }

  click() {
    console.log('click');
  }

  private showSnackBar(message: string, action: string, snackBarDuration: number) {
    this._snackBar.open(message, action, { duration: snackBarDuration })
  }

}
