import {Component, DoCheck, OnInit} from '@angular/core';
import {Subject, throwError} from "rxjs";
import {MatDialog, MatSnackBar} from "@angular/material";
import {EventsRestService} from "../services/events-rest.service";
import {of} from "rxjs/internal/observable/of";
import {catchError, debounceTime, delay} from "rxjs/operators";
import {tap} from "rxjs/internal/operators/tap";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {switchMap} from "rxjs/internal/operators/switchMap";
import {EventsDialogComponent} from "../dialogs-templates/events-dialog/events-dialog.component";

export interface Event {
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
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.css']
})

export class EventsComponent implements OnInit,DoCheck {
	eventsList: Event[];
	isLoading: boolean;
	isSearchActive: boolean;
	breakpoint: number;
	selectOptions = [20, 40, 60, 80, 100];
	selected = this.selectOptions[0];

	private searchTerms = new Subject<string>();

	constructor(private rest: EventsRestService,
				private _snackBar: MatSnackBar,
				private dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.getStartEvents(this.selected);
		this.getEvent();
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
		this.getStartEvents(this.selected);
	}

	getEvent() {
		const obsNoCharacters = of<Event[]>([]);

		this.searchTerms
			.pipe(
				debounceTime(1000),
				tap(() => this.isSearchActive = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.rest.getEventsFromUserSearch(term);

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

			this.eventsList = response;
			this.isSearchActive = false;
		});
	}

	getStartEvents(limit) {
		this.rest.getEvents(limit)
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
				this.eventsList = data;
				this.isSearchActive = false;
				this.isLoading = false;
			})
	}

	openDialog(selectedItem: object) {
		this.dialog.open(EventsDialogComponent, {
			width: '50vw',
			data: selectedItem,
		});
	}
}
