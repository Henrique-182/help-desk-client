import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './pages/user/user.component';



@NgModule({
  declarations: [
    LoginComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    UserComponent
  ]
})
export class AuthModule { }
