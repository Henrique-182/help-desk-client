import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { UserComponent } from "./pages/user/user.component";
import { UserFormComponent } from "./pages/user-form/user-form.component";

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/user', component: UserComponent },
    { path: 'auth/user/info', component: UserFormComponent },
    { path: 'auth/user/add', component: UserFormComponent },
    { path: 'auth/user/edit', component: UserFormComponent },
    { path: 'auth/user/delete', component: UserFormComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
