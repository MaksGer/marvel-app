import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationFormComponent} from './authentication-form/authentication-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule, MatTabsModule} from "@angular/material";
import {HeaderComponent} from './header/header.component';
import {HeroesComponent} from './heroes/heroes.component';
import {ComicsComponent} from './comics/comics.component';
import {CreatorsComponent} from './creators/creators.component';
import {EventsComponent} from './events/events.component';
import {SeriesComponent} from './series/series.component';
import {StoriesComponent} from './stories/stories.component';
import {FavoritesComponent} from './favorites/favorites.component';
import {LoginPageComponent} from './layouts/login-page/login-page.component';
import {MainPageLayoutComponent} from './layouts/main-page-layout/main-page-layout.component';
import {NgxSpinnersModule} from "ngx-spinners";
import {HttpClientModule} from "@angular/common/http";
import { Hero } from './dialogs-templates/hero.dialog/hero.dialog.component';

@NgModule({
	declarations: [
		AppComponent,
		AuthenticationFormComponent,
		HeaderComponent,
		HeroesComponent,
		ComicsComponent,
		CreatorsComponent,
		EventsComponent,
		SeriesComponent,
		StoriesComponent,
		FavoritesComponent,
		LoginPageComponent,
		MainPageLayoutComponent,
		Hero.DialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule,
		MatSnackBarModule,
		MatTabsModule,
		NgxSpinnersModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
