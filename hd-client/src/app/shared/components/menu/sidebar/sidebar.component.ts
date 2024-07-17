import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor(
    private _router: Router
  ) {

  }

  onUsersButtonClick() {
    this._router.navigate(['/auth/users'])
  }

  onKnowledgesButtonClick() {
    this._router.navigate(['/knowledge/list'])
  }

  onChatButtonClick() {

  }

  onReportsButtonClick() {

  }

}
