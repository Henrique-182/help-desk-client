import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './pages/user/user.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { UserPermissionPipe } from './pipes/user-permission.pipe';


@NgModule({
  declarations: [
    LoginComponent,
    UserComponent,
    UserFormComponent,
    UserPermissionPipe
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    UserComponent,
    UserFormComponent
  ]
})
export class AuthModule { }
