import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from './pipe/pipe.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule
  ]
})
export class SharedModule { }
