import {Component, DoCheck, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {catchError, debounceTime, delay} from "rxjs/operators";
import {fromEvent, throwError} from "rxjs";
import {MatPaginator, MatSnackBar, PageEvent} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";

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
	searchForm: FormGroup;

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSize = 20;
	pageSizeOptions = [ 8, 20, 40, 50];
	lowValue = 0;
	highValue = 20;

	constructor(private heroes: HeroesService,
				private _snackBar: MatSnackBar,
	) {
		this.searchForm = new FormGroup({
			searchInput: new FormControl(null, [])
		})
	}

	ngOnInit() {
		this.isLoading = true;
		this.heroes.getHeroes()
			.pipe(
				delay(1000),
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
				this.heroesList = response.data.results;
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

	getPaginatorData(event: PageEvent): PageEvent {
		this.length = this.heroesList.length;
		this.lowValue = event.pageIndex * event.pageSize;
		this.highValue = this.lowValue + event.pageSize;

		return event;
	}

	searchUserHero(event) {
		// console.log( this.searchForm.controls);
		// 		fromEvent(this.searchForm.controls.searchInput<>, 'keyup')
		// 			.pipe(
		// 				debounceTime(2000)
		// 				)
		// 			.subscribe(response => {
		// 				this.heroesList = response.data.results;
		// 				// this.isLoading = false;
		// 			});
	}
}
// this.heroes.getHeroFromUserString(event.target.value)
// 	.pipe(
// 		debounceTime(2000),
// 		catchError(error => {
// 			this._snackBar.open(error.message, 'Close', {
// 				duration: 4000,
// 				horizontalPosition: 'center',
// 				panelClass: 'error-snack-bar',
// 			});
// 			// this.isLoading = false;
//
// 			return throwError(error);
