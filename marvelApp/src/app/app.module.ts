import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationFormComponent} from './authentication-form/authentication-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material";

@NgModule({
	declarations: [
		AppComponent,
		AuthenticationFormComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		MatSnackBarModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
