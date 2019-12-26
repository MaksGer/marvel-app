import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {MatPaginator, MatSnackBar, PageEvent} from "@angular/material";
import {catchError, debounceTime, delay, map, switchMap} from "rxjs/operators";
import {Observable, of, Subject, throwError} from "rxjs";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {tap} from "rxjs/internal/operators/tap";

export interface Hero {
	id: number,
	name: string,
	description?: string,
	thumbnail: {
		path: string,
		extension: string
	},
	urls: [{
		type: string,
		url: string,
	}],
}

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit, DoCheck {
	heroesList: Hero[];
	isLoading = true;
	breakpoint: number;
	heroes$: Observable<Hero[]>;
	userHeroes$: Observable<Hero[]>;
	private searchTerms = new Subject<string>();

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSizeOptions = [8, 20, 40, 50];


	constructor(private heroes: HeroesService,
				private _snackBar: MatSnackBar,
	) {
	}

	ngOnInit() {
		// this.getStartHero();
		this.getHero();

	}

	ngDoCheck(): void {
		this.setBreakpoint();
	}

	setBreakpoint() {
		switch (true) {
			case window.innerWidth > 2000:
				this.breakpoint = 5;

				break;

			case window.innerWidth > 1400:
				this.breakpoint = 4;

				break;

			case window.innerWidth > 800:
				this.breakpoint = 2;

				break;

			case window.innerWidth < 800:
				this.breakpoint = 1;
		}
	}

	search(userString: string) {
		this.searchTerms.next(userString);
	}

	// getPaginatorData(event: PageEvent): PageEvent {
	// 	this.length = this.heroesList.length;
	// 	this.lowValue = event.pageIndex * event.pageSize;
	// 	this.highValue = this.lowValue + event.pageSize;
	//
	// 	return event;
	// }

	getHero() {
		const obsNoCharacters = of<Hero[]>([]);

		this.heroes$ = this.searchTerms
			.pipe(
				debounceTime(1000),
				// tap(_ => this.isLoading = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						// this.isLoading = true;
						return this.heroes.getHeroesFromUserSearch(term);

					} else {
						// this.isLoading = false;
						return obsNoCharacters;
					}

				}),
				// tap(_ => this.isLoading = false),
				// switchMap(heroes => {
				// 	this.isLoading = false;
				// 	return of(heroes);
				// }),

			);
		this.isLoading = false;
		// .subscribe(data =>
		// this.heroes$ = data)
	}

	getStartHero() {
		 this.heroes.getHeroes()
			.pipe(
				delay(1000),
				map((response: any) => {
						return response.data.results;
					}),
				catchError(error => {
					this._snackBar.open(error.message, 'Close', {
						duration: 4000,
						horizontalPosition: 'center',
						panelClass: 'error-snack-bar',
					});
					this.isLoading = false;

					return throwError(error);
				})
			)
			.subscribe(data => {
				this.heroes$ = of(data);
				this.isLoading = false;
			})
	}
}
