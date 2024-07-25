import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from './pipe/pipe.module';
import { PrimeNgModule } from './prime-ng/prime-ng.module';
import { ToolbarComponent } from './components/menu/toolbar/toolbar.component';
import { SidebarComponent } from './components/menu/sidebar/sidebar.component';
import { BreadcrumbComponent } from './components/menu/breadcrumb/breadcrumb.component';
import { SidebarItemComponent } from './components/menu/sidebar-item/sidebar-item.component';


@NgModule({
  declarations: [
    ToolbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    SidebarItemComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    AngularMaterialModule,
    PrimeNgModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule,
    ToolbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    SidebarItemComponent
  ]
})
export class SharedModule { }
