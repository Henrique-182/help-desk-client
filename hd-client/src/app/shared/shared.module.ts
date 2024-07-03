import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PipesModule } from './pipe/pipe.module';
import { PrimengModule } from './primeng/primeng.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PrimengModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    AngularMaterialModule,
    PrimengModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule
  ]
})
export class SharedModule { }
