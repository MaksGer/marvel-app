import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {MatPaginator, MatSnackBar, PageEvent} from "@angular/material";
import {catchError, debounceTime, delay, distinctUntilChanged, map, switchMap} from "rxjs/operators";
import {Subject, throwError} from "rxjs";

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
	breakpoint: number;
	private searchTerms = new Subject<string>();

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSize = 20;
	pageSizeOptions = [8, 20, 40, 50];
	lowValue = 0;
	highValue = 20;

	constructor(private heroes: HeroesService,
				private _snackBar: MatSnackBar,
	) {
	}

	ngOnInit() {
		this.isLoading = true;
		this.heroes.getHeroes()
			.pipe(
				delay(1000),
				map((response: any) => response.data.results),
				catchError(error => {
					this._snackBar.open(error.message, 'Close', {
						duration: 4000,
						horizontalPosition: 'center',
						panelClass: 'error-snack-bar',
					});
					this.isLoading = false;

					return throwError(error);
				}))
			.subscribe(response => {
				this.heroesList = response;
				this.isLoading = false;
			});
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
		this.searchTerms.next(userString.trim());

		if (!userString.trim()) {
			return;

		}

		this.searchTerms
			.pipe(
				debounceTime(2000),
				distinctUntilChanged(),
				switchMap((term: string) => this.heroes.getHeroesFromUserSearch(term)),
				map((response: any) => response.data.results),
			)
			.subscribe((response: any) => {
				this.heroesList = response;
			});
	}

	getPaginatorData(event: PageEvent): PageEvent {
		this.length = this.heroesList.length;
		this.lowValue = event.pageIndex * event.pageSize;
		this.highValue = this.lowValue + event.pageSize;

		return event;
	}
}
