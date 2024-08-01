import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-chat-home-page',
  templateUrl: './chat-home-page.component.html',
  styleUrl: './chat-home-page.component.scss'
})
export class ChatHomePageComponent {

  username: string

  breadCrumbItems: MenuItem[] = [
    { label: 'Chat', url: '/chat/home' }
  ]

  constructor(
    private _router: Router
  ) {
    this.username = localStorage.getItem('username') || 'Usuário'
  }

  onGoToSelectSectorPage() {
    this._router.navigate(['/chat/sector/select'])
  }

  onGoToSectorsPage() {
    this._router.navigate(['/chat/sectors'])
  }

  onGoToChatReportsPage() {

  }

}
