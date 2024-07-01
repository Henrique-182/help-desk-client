import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    TableModule,
    ButtonModule
  ],
  exports: [
    TableModule,
    ButtonModule
  ]
})
export class PrimengModule { }
