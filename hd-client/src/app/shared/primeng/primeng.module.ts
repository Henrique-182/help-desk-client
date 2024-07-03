import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';


@NgModule({
  exports: [
    TableModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    InputTextModule,
    ToolbarModule
  ]
})
export class PrimengModule { }
