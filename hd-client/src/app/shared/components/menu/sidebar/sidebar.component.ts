import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  usersIcon = 'pi pi-users'
  isUsersTiredMenuDisplayNone: boolean = true
  usersTiredMenu: MenuItem[] = [
    { label: 'Listagem', icon: 'pi pi-list', url: '/auth/users' },
    { label: 'Relatórios', icon: 'pi pi-file' }
  ]

  knowledgesIcon = 'pi pi-book'
  isKnowledgesTiredMenuDisplayNone: boolean = true
  knowledgesTiredMenu: MenuItem[] = [
    { label: 'Listagem', icon: 'pi pi-list', url: '/knowledge/list' },
    { label: 'Relatórios', icon: 'pi pi-file' }
  ]

  chatsIcon = 'pi pi-comments'
  isChatsTiredMenuDisplayNone: boolean = true
  chatsTiredMenu: MenuItem[] = [
    { label: 'Listagem', icon: 'pi pi-list' },
    { label: 'Relatórios', icon: 'pi pi-file' }
  ]

  reportsIcon = 'pi pi-file-pdf'
  isReportsTiredMenuDisplayNone: boolean = true
  reportsTiredMenu: MenuItem[] = [
    { 
      label: 'Listagem', 
      icon: 'pi pi-list',
      items: [
        { label: 'Usuários', icon: 'pi pi-users' },
        { label: 'Conhecimentos', icon: 'pi pi-book' },
        { label: 'Chats', icon: 'pi pi-comments' }
      ]
    }
  ]

  constructor(
    private _router: Router
  ) {

  }

}
