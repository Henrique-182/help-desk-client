import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss'
})
export class SidebarItemComponent {

  @Input({ required: true })
  tooltipMessage: string = ''

  @Input({ required: true })
  icon: string = ''

  @Input({ required: true })
  isTiredMenuDisplayNone: boolean = true

  @Input({ required: true })
  tiredMenuItems: MenuItem[] = []

}
