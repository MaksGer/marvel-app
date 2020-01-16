import {Component, DoCheck, OnInit} from '@angular/core';
import {catchError, delay} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {StoriesRestService} from '../services/stories-rest.service';
import {MatSnackBar} from '@angular/material';

export interface Story {
	id: number;
	title: string;
	description?: string;
}

@Component({
	selector: 'app-stories',
	templateUrl: './stories.component.html',
})

export class StoriesComponent implements OnInit, DoCheck {
	storiesList: Story[];
	isLoading: boolean;
	isSearchActive: boolean;
	breakpoint: number;

	constructor(private rest: StoriesRestService,
				private _snackBar: MatSnackBar,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.getStories();
	}

	getStories(limit = 20) {
		this.rest.getStories(limit)
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
				this.isSearchActive = false;
				this.isLoading = false;
			});
	}

	getLimit(limit) {
		this.isSearchActive = true;
		this.getStories(limit);
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
}
