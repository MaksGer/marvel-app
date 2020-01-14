import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {catchError, debounceTime, delay, filter, switchMap} from 'rxjs/operators';
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

export class CreatorsComponent implements OnInit {
	creatorsList: Creator[];
	isLoading: boolean;
	isSearchActive: boolean;

	private searchTerms = new Subject<string>();

	constructor(private rest: CreatorsRestService,
				private _snackBar: MatSnackBar,
	) { }

	ngOnInit() {
		this.isLoading = true;
		this.getStartCreators(20);
		this.getCreator();
	}

	search(userString: string) {
		this.searchTerms.next(userString);
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
		this.searchTerms
			.pipe(
				debounceTime(1000),
				distinctUntilChanged(),
				filter(term => !!term),
				switchMap((term: string) => {
						return this.rest.getCreatorsFromUserSearch(term);
				}),
				tap(() => this.isSearchActive = true),
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

	getLimit (limit) {
		this.isSearchActive = true;
		this.getStartCreators(limit);
	}
}
