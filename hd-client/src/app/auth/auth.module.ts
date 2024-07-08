import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login/login-page.component';
import { SharedModule } from '../shared/shared.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { ManageUserPageComponent } from './pages/manage-user-page/manage-user-page.component';
import { UserPermissionPipe } from './pipes/user-permission.pipe';


@NgModule({
  declarations: [
    LoginPageComponent,
    UsersPageComponent,
    ManageUserPageComponent,
    UserPermissionPipe
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ],
  exports: [
    LoginPageComponent,
    UsersPageComponent,
    ManageUserPageComponent
  ]
})
export class AuthModule { }
