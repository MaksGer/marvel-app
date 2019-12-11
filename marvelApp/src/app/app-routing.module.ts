import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {main} from "@angular/compiler-cli/src/main";
import {MainComponent} from "./main/main.component";
import {AuthenticationFormComponent} from "./authentication-form/authentication-form.component";


const routes: Routes = [
	{path: 'main', component: MainComponent},
	{path: 'login', component: AuthenticationFormComponent}
	];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
