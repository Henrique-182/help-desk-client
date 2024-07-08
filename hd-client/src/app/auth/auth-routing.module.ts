import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./pages/login/login-page.component";
import { UsersPageComponent } from "./pages/users-page/users-page.component";
import { ManageUserPageComponent } from "./pages/manage-user-page/manage-user-page.component";

const routes: Routes = [
    { path: 'auth/login', component: LoginPageComponent },
    { path: 'auth/users', component: UsersPageComponent },
    { path: 'auth/user/info/:id', component: ManageUserPageComponent },
    { path: 'auth/user/edit/:id', component: ManageUserPageComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
