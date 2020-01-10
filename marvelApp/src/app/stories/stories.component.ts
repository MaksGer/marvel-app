import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {catchError, debounceTime, delay, distinctUntilChanged, switchMap, tap} from "rxjs/operators";
import {of, Subject, throwError} from "rxjs";
import {StoriesRestService} from "../services/stories-rest.service";
import {MatPaginator, MatSnackBar} from "@angular/material";

export interface Story {
	id: number,
	title: string,
	description?: string,
	// thumbnail: {
	// 	path: string,
	// 	extension: string
	// },
	// urls: [{
	// 	type: string,
	// 	url: string,
	// }],
}

@Component({
	selector: 'app-stories',
	templateUrl: './stories.component.html',
	styleUrls: ['./stories.component.css'],
})
export class StoriesComponent implements OnInit, DoCheck {
	storiesList: Story[];
	isLoading: boolean;
	breakpoint: number;
	currentItemsToShow: Story[];
	isDescrActivated = false;
	prevValue: string;

	private searchTerms = new Subject<string>();

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSizeOptions = [8, 20, 40, 50];

//
	constructor(private rest: StoriesRestService,
				private _snackBar: MatSnackBar,
				// private dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.getStartStories();
		// this.getStories();
	}

	getStartStories() {
		this.rest.getStories()
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
				this.storiesList = data;
				this.currentItemsToShow = data.slice(0, 20);
				this.isLoading = false;
			})
	}

	// search(userString: string) {
	// 	this.searchTerms.next(userString);
	// }

	// getStories() {
	// 	const obsNoCharacters = of<Event[]>([]);
	//
	// 	this.searchTerms
	// 		.pipe(
	// 			debounceTime(1000),
	// 			tap(() => this.isLoading = true),
	// 			distinctUntilChanged(),
	// 			switchMap((term: string) => {
	// 				if (term) {
	// 					return this.rest.getStoriesFromUserSearch(term);
	//
	// 				} else {
	// 					return obsNoCharacters;
	//
	// 				}
	// 			}),
	// 			delay(1000),
	// 		)
	// 		.subscribe(response => {
	// 			if (!response[0]) {
	// 				this._snackBar.open('There are no matches', 'Close', {
	// 					duration: 2000,
	// 					horizontalPosition: 'center',
	// 					panelClass: 'error-snack-bar',
	// 				});
	// 			}
	//
	// 			this.storiesList = response;
	// 			this.currentItemsToShow = response.slice(0, 20);
	// 			this.length = response.length;
	// 			this.isLoading = false;
	// 		});
	// }

	onPageChanges($event) {
		this.currentItemsToShow = this.storiesList.slice
		($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
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
// 	openDialog(selectedHero: object) {
// 		this.dialog.open(HeroDialogComponent, {
// 			width: '90vh',
// 			data: selectedHero,
// 		});
// 	}
	}

	changeText(event, story?: Story,) {
		if (story && !this.isDescrActivated) {
			this.isDescrActivated = true;
			this.prevValue = event.target.offsetParent.firstChild.innerText;
			event.target.offsetParent.firstChild.innerText = story.title;
		} else {
			event.target.offsetParent.firstChild.innerText = this.prevValue;
			this.isDescrActivated = false
		}
	}
}

