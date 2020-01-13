import {Component, DoCheck, OnInit} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {MatDialog, MatSnackBar} from '@angular/material';
import {EventsRestService} from '../services/events-rest.service';
import {of} from 'rxjs/internal/observable/of';
import {catchError, debounceTime, delay} from 'rxjs/operators';
import {tap} from 'rxjs/internal/operators/tap';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {switchMap} from 'rxjs/internal/operators/switchMap';
import {EventsDialogComponent} from '../dialogs-templates/events-dialog/events-dialog.component';
import {Item} from '../grid-for-tabs/grid-for-tabs.component';

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

export class EventsComponent implements OnInit {
	isLoading: boolean;
	isSearchActive: boolean;
	eventsList: Event[];
	// childConfig = {
	// 	isSearchActive = false,
	// 	itemsList = null,
	// };

	private searchTerms = new Subject<string>();

	constructor(private rest: EventsRestService,
				private _snackBar: MatSnackBar,
				// private modalWindow: EventsDialogComponent,
				// private dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.getStartEvents(20);
		this.getEvent();
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
				// this.childConfig.itemsList = data;
				// this.childConfig.isSearchActive = false;
				this.isLoading = false;
				this.isSearchActive = false;

			})
	}

	search(userString: string) {
		this.searchTerms.next(userString);
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
			// this.childConfig.itemsList = response;
			this.isSearchActive = false;
		});




		// const obsNoCharacters = of<Event[]>([]);
		//
		// this.searchTerms
		// 	.pipe(
		// 		debounceTime(1000),
		// 		tap(() => this.isSearchActive = true),
		// 		distinctUntilChanged(),
		// 		switchMap((term: string) => {
		// 			if (term) {
		// 				return this.rest.getEventsFromUserSearch(term);
		//
		// 			}
		//
		// 			return obsNoCharacters;
		// 		}),
		// 		delay(1000),
		// 	)
		// 	.subscribe(response => {
		// 	if (!response[0]) {
		// 		this._snackBar.open('There are no matches', 'Close', {
		// 			duration: 2000,
		// 			horizontalPosition: 'center',
		// 			panelClass: 'error-snack-bar',
		// 		});
		// 	}
		//
		// 	this.eventsList = response;
		// 	this.isSearchActive = false;
		// });
	}

	// openDialog(selectedItem: object) {
	// 	this.dialog.open(EventsDialogComponent, {
	// 		width: '50vw',
	// 		data: selectedItem,
	// 	});
	// }

	getLimit (limit) {
		this.isSearchActive = true;
		this.getStartEvents(limit);
	}
}
