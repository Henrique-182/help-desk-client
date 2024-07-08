import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  exports: [
    TableModule,
    ButtonModule,
    TagModule,
    DropdownModule,
    InputTextModule,
    ToolbarModule,
    InputGroupModule,
    InputGroupAddonModule,
    FloatLabelModule,
    MultiSelectModule,
    InputSwitchModule,
    ToggleButtonModule,
    DialogModule
  ]
})
export class PrimengModule { }
