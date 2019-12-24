import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {catchError, delay, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {ComicsRestService} from "../services/comics-rest.service";
import {MatDialog, MatPaginator, MatSnackBar, PageEvent} from "@angular/material";
import {ComicsDialogComponent} from "../dialogs-templates/comics-dialog/comics-dialog.component";


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
	styles: []
})
export class ComicsComponent implements OnInit, DoCheck{
	comicsList: Comics[];
	isLoading: boolean;
	breakpoint: number;

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSize = 20;
	pageSizeOptions = [8, 20, 40, 50];
	lowValue = 0;
	highValue = 20;

	constructor (
		private rest: ComicsRestService,
		private _snackBar: MatSnackBar,
		private dialog: MatDialog,
	) { }

	ngOnInit() {
		this.isLoading = true;
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
		this.length = this.comicsList.length;
		this.lowValue = event.pageIndex * event.pageSize;
		this.highValue = this.lowValue + event.pageSize;

		return event;
	}

	openDialog(comics: Comics) {
		console.log(comics);
		this.dialog.open(ComicsDialogComponent, {
			width: '70vh',
			data: comics,
		});
	}
}
