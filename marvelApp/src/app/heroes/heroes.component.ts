import {Component, DoCheck, OnInit} from '@angular/core';
import {HeroesRestService} from "../services/heroes-rest.service";
import {MatSnackBar} from "@angular/material";
import {HeroDialogComponent} from "../dialogs-templates/hero-dialog/hero-dialog.component";
import {MatDialog} from '@angular/material/dialog';
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
	selectOptions = [20, 40, 60, 80, 100];
	selected = this.selectOptions[0];

	private searchTerms = new Subject<string>();

	constructor(private heroes: HeroesRestService,
				private _snackBar: MatSnackBar,
				private dialog: MatDialog,
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
				tap(() => this.isSearchActive = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.heroes.getHeroesFromUserSearch(term);
					}

					return obsNoCharacters;
				}),
				delay(1000),
			)
			.subscribe(response => {
				if (!response[0]) {
					this._snackBar.open('There are no matches', 'Close', {
						duration: 2000,
						horizontalPosition: 'center',
						panelClass: 'error-snack-bar',
					});
				}

				this.heroesList = response;
				this.isSearchActive = false;
			});
	}

	getStartHero(limit) {
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

	openDialog(selectedHero: object) {
		this.dialog.open(HeroDialogComponent, {
			width: '70vw',
			data: selectedHero,
		});
	}
}
