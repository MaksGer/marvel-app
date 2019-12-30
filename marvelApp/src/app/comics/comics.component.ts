import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {catchError, debounceTime, delay, map} from "rxjs/operators";
import {Subject, throwError} from "rxjs";
import {ComicsRestService} from "../services/comics-rest.service";
import {MatDialog, MatPaginator, MatSnackBar} from "@angular/material";
import {ComicsDialogComponent} from "../dialogs-templates/comics-dialog/comics-dialog.component";
import {of} from "rxjs/internal/observable/of";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {tap} from "rxjs/internal/operators/tap";
import {switchMap} from "rxjs/internal/operators/switchMap";


export interface Comics {
	id: number,
	title: string,
	description?: string,
	urls: [{
		type: string,
		url: string
	}],
	thumbnail: {
		path: string,
		extension: string,
	},
}

@Component({
	selector: 'app-comics',
	templateUrl: './comics.component.html',
	styleUrls: ['./comics.component.css'],
})
export class ComicsComponent implements OnInit, DoCheck {
	comicsList: Comics[];
	isLoading: boolean;
	breakpoint: number;
	currentItemsToShow: Comics[];

	private searchTerms = new Subject<string>();

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSizeOptions = [8, 20, 40, 50];


	constructor(
		private rest: ComicsRestService,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
	) {
	}

	ngOnInit() {
		this.isLoading = true;
		this.getStartComics();
		this.getComics();

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

	onPageChanges($event) {
		this.currentItemsToShow = this.comicsList.slice
		($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
	}

	openDialog(comics: Comics) {
		console.log(comics);
		this.dialog.open(ComicsDialogComponent, {
			width: '70vh',
			data: comics,
		});
	}

	getStartComics() {
		this.rest.getComics()
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
				this.comicsList = response;
				this.currentItemsToShow = response.slice(0, 20);
				this.length = response.length;
				this.isLoading = false;
			});
	}

	search(userString: string) {
		this.searchTerms.next(userString);
	}

	getComics() {
		const obsNoCharacters = of<Comics[]>([]);

		this.searchTerms
			.pipe(
				debounceTime(1000),
				tap(() => this.isLoading = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.rest.getComicsFromUserSearch(term);

					} else {
						return obsNoCharacters;

					}
				}),
				delay(1000),
			).subscribe(response => {
			if (!response[0]) {
				console.log('block if');
				this._snackBar.open('There are no matches', 'Close', {
					duration: 2000,
					horizontalPosition: 'center',
					panelClass: 'error-snack-bar',
				});
			}

			this.comicsList = response;
			this.currentItemsToShow = response.slice(0, 20);
			this.length = response.length;
			this.isLoading = false;
		});
	}
}
