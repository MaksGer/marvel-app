import {Component, DoCheck, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatDialog} from '@angular/material/dialog';
import {catchError, debounceTime, delay, switchMap} from 'rxjs/operators';
import {of, Subject, throwError} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {tap} from 'rxjs/internal/operators/tap';
import {CreatorsRestService} from '../services/creators-rest.service';
import {CreatorsDialogComponent} from '../dialogs-templates/creators-dialog/creators-dialog.component';

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
	isSearchActive: boolean;
	breakpoint: number;
	selectOptions = [20, 40, 60, 80, 100];
	selected = this.selectOptions[0];

	private searchTerms = new Subject<string>();

	constructor(private rest: CreatorsRestService,
				private _snackBar: MatSnackBar,
				private dialog: MatDialog,
	) { }

	ngOnInit() {
		this.isLoading = true;
		this.getStartCreators(this.selected);
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

	itemsPerPage() {
		this.isSearchActive = true;
		this.getStartCreators(this.selected);
	}

	getStartCreators(limit) {
		this.rest.getCreators(limit)
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
				this.isSearchActive = false;
				this.isLoading = false;
			});
	}

	getCreator() {
		const obsNoCharacters = of<Creator[]>([]);

		this.searchTerms
			.pipe(
				debounceTime(1000),
				tap(() => this.isSearchActive = true),
				distinctUntilChanged(),
				switchMap((term: string) => {
					if (term) {
						return this.rest.getCreatorsFromUserSearch(term);
					}

					return obsNoCharacters;
				}),
				delay(1000),
			).subscribe(response => {
			if (!response[0]) {
				this._snackBar.open('There are no matches', 'Close', {
					duration: 2000,
					horizontalPosition: 'center',
					panelClass: 'error-snack-bar',
				});
			}

			this.creatorsList = response;
			this.isSearchActive = false;
		});
	}

	openDialog(selectedItem: object) {
		this.dialog.open(CreatorsDialogComponent, {
			width: '40vw',
			data: selectedItem,
		});
	}
}
