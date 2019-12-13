import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {AuthenticationFormComponent} from "./authentication-form/authentication-form.component";
import {AuthGuard} from "./auth.guard";
import {HeroesComponent} from "./heroes/heroes.component";
import {ComicsComponent} from "./comics/comics.component";
import {CreatorsComponent} from "./creators/creators.component";
import {EventsComponent} from "./events/events.component";
import {SeriesComponent} from "./series/series.component";
import {StoriesComponent} from "./stories/stories.component";
import {FavoritesComponent} from "./favorites/favorites.component";

const routes: Routes = [
	{path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
	{path: 'login', component: AuthenticationFormComponent},
	{path: 'heroes', component: HeroesComponent},
	{path: 'comics', component: ComicsComponent},
	{path: 'creators', component: CreatorsComponent},
	{path: 'events', component: EventsComponent},
	{path: 'series', component: SeriesComponent},
	{path: 'stories', component: StoriesComponent},
	{path: 'favorites', component: FavoritesComponent},
	{path: '**', redirectTo: 'main'},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
