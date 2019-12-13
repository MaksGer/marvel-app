import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthenticationFormComponent} from "./authentication-form/authentication-form.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
	{path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
	{path: 'login', component: AuthenticationFormComponent},
	{path: '**', redirectTo: 'main'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
