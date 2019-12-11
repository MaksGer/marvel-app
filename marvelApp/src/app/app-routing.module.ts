import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthenticationFormComponent} from "./authentication-form/authentication-form.component";

const routes: Routes = [
	{path: 'main', component: MainPageComponent},
	{path: 'login', component: AuthenticationFormComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
