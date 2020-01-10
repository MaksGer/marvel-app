import {Component, DoCheck, OnInit} from '@angular/core';
import {SeriesRestService} from "../services/series-rest.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {Subject, throwError} from "rxjs";
import {catchError, debounceTime, delay} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {tap} from "rxjs/internal/operators/tap";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {switchMap} from "rxjs/internal/operators/switchMap";
import {SeriesDialogComponent} from "../dialogs-templates/series-dialog/series-dialog.component";

export interface Series {
	id: number,
	title: string,
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
	selector: 'app-series',
	templateUrl: './series.component.html',
	styleUrls: ['./series.component.css'],
})

export class SeriesComponent implements OnInit, DoCheck {
	seriesList: Series[];
	isLoading: boolean;
	isSearchActive: boolean;
	breakpoint: number;
	selectOptions = [20, 40, 60, 80, 100];
	selected = this.selectOptions[0];

	private searchTerms = new Subject<string>();

	constructor(private rest: SeriesRestService,
				private _snackBar: MatSnackBar,
				private dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.getStartSeries(this.selected);
		this.getSeries();
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
		this.getStartSeries(this.selected);
	}

	getSeries() {
		const obsNoCharacters = of<Event[]>([]);

		this.searchTerms
			.pipe(
				debounceTime(1000),
				tap(() => this.isSearchActive = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.rest.getSeriesFromUserSearch(term);
					} else {
						return obsNoCharacters;
					}
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

				this.seriesList = response;
				this.isSearchActive = false;
			});
	}

	getStartSeries(limit) {
		this.rest.getSeries(limit)
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
				this.seriesList = data;
				this.isSearchActive = false;
				this.isLoading = false;
			})
	}

	openDialog(selectedItem: object) {
		this.dialog.open(SeriesDialogComponent, {
			width: '50vw',
			data: selectedItem,
		});
	}
}
