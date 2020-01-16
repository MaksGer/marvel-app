import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthenticationFormComponent} from './authentication-form/authentication-form.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSnackBarModule, MatTabsModule} from '@angular/material';
import {HeaderComponent} from './header/header.component';
import {HeroesComponent} from './heroes/heroes.component';
import {ComicsComponent} from './comics/comics.component';
import {CreatorsComponent} from './creators/creators.component';
import {EventsComponent} from './events/events.component';
import {SeriesComponent} from './series/series.component';
import {StoriesComponent} from './stories/stories.component';
import {LoginPageComponent} from './layouts/login-page/login-page.component';
import {MainPageLayoutComponent} from './layouts/main-page-layout/main-page-layout.component';
import {NgxSpinnersModule} from 'ngx-spinners';
import {HttpClientModule} from '@angular/common/http';
import {HeroDialogComponent} from './dialogs-templates/hero-dialog/hero-dialog.component';
import {NguCarouselModule} from '@ngu/carousel';
import {OriginDialogComponent} from './dialogs-templates/origin-dialog/origin-dialog.component';
import {TruncatePipe} from './pipes/truncate.pipe';
import {GridForTabsComponent} from './grid-for-tabs/grid-for-tabs.component';
import {ItemCardComponent} from './item-card/item-card.component';
import {PaginationComponent} from './pagination/pagination.component';

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
		LoginPageComponent,
		MainPageLayoutComponent,
		HeroDialogComponent,
		OriginDialogComponent,
		TruncatePipe,
		GridForTabsComponent,
		ItemCardComponent,
		PaginationComponent,
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
		NguCarouselModule,
	],
	entryComponents: [
		HeroDialogComponent,
		OriginDialogComponent,
		ItemCardComponent,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule { }
