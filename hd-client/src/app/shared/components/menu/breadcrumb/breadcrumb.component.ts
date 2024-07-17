import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent implements OnInit {

  model: MenuItem[] = [
    { icon: 'pi pi-home', routerLink: '/home/page' },
  ]

  @Input({ required: false })
  items: MenuItem[] = []

  constructor () {}

  ngOnInit(): void {
    
    this.items.forEach(i => this.model.push(i))
  }
}
