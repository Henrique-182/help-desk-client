import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./pages/login/login.component";
import { UserComponent } from "./pages/user/user.component";

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/user', component: UserComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
