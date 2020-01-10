import {Component, DoCheck, OnInit} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {MatSnackBar} from "@angular/material";
import {catchError, debounceTime, delay, switchMap} from "rxjs/operators";
import {of, Subject, throwError} from "rxjs";
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
	isLoading: boolean;
	isSearchActive: boolean;
	breakpoint: number;
	selected = "20";

	private searchTerms = new Subject<string>();

	constructor(private heroes: HeroesService,
				private _snackBar: MatSnackBar,
	) { }

	ngOnInit() {
		this.isLoading = true;
		this.getStartHero(this.selected);
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

	itemsPerPage() {
		this.isSearchActive = true;
		this.getStartHero(this.selected);
	}

	getHero() {
		const obsNoCharacters = of<Hero[]>([]);

		this.searchTerms
			.pipe(
				debounceTime(1000),
				tap(_ => this.isSearchActive = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.heroes.getHeroesFromUserSearch(term);

					} else {
						return obsNoCharacters;

					}
				}),
				delay(1000),
			).subscribe(response => {
			this.heroesList = response;
			this.isSearchActive = false;
		});
	}

	getStartHero(limit: string) {
		this.heroes.getHeroes(limit)
			.pipe(
				delay(1000),
				catchError(error => {
					this._snackBar.open(error.message, 'Close', {
						duration: 4000,
						horizontalPosition: 'center',
						panelClass: 'error-snack-bar',
					});

					return throwError(error);
				})
			)
			.subscribe(data => {
				this.heroesList = data;
				this.isLoading = false;
				this.isSearchActive = false;
			})
	}
}
