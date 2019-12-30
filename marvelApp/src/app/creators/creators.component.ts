import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {HeroesRestService} from "../services/heroes-rest.service";
import {MatPaginator, MatSnackBar} from "@angular/material";
import {HeroDialogComponent} from "../dialogs-templates/hero.dialog/hero.dialog.component";
import {MatDialog} from '@angular/material/dialog';
import {catchError, debounceTime, delay, switchMap} from "rxjs/operators";
import {of, Subject, throwError} from "rxjs";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";
import {tap} from "rxjs/internal/operators/tap";
import {CreatorsRestService} from "../services/creators-rest.service";

export interface Creator {
	id: number,
	fullName: string,
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
	selector: 'app-creators',
	templateUrl: './creators.component.html',
	styleUrls: ['./creators.component.css']
})
export class CreatorsComponent implements OnInit, DoCheck {
	creatorsList: Creator[];
	isLoading: boolean;
	breakpoint: number;
	currentItemsToShow: Creator[];

	private searchTerms = new Subject<string>();

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSizeOptions = [8, 20, 40, 50];

	constructor(private rest: CreatorsRestService,
				private _snackBar: MatSnackBar,
				private dialog: MatDialog,
	) {
	}

	ngOnInit() {
		this.isLoading = true;
		this.getStartCreators();
		this.getCreator();

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

	onPageChanges($event) {
		this.currentItemsToShow = this.creatorsList.slice
		($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
	}

	getStartCreators() {
		this.rest.getCreators()
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
				this.creatorsList = data;
				this.currentItemsToShow = data.slice(0, 20);
				this.isLoading = false;
			})
	}

	getCreator() {
		const obsNoCharacters = of<Creator[]>([]);

		this.searchTerms
			.pipe(
				debounceTime(1000),
				tap(() => this.isLoading = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.rest.getCreatorsFromUserSearch(term);

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

			this.creatorsList = response;
			this.currentItemsToShow = response.slice(0, 20);
			this.length = response.length;
			this.isLoading = false;
		});
	}

	openDialog(selectedHero: object) {
		console.log(selectedHero);
		// this.dialog.open(HeroDialogComponent, {
		// 	width: '90vh',
		// 	data: selectedHero,
		// });
	}
}
