import {Component, OnInit} from '@angular/core';
import {catchError, delay} from "rxjs/operators";
import {throwError} from "rxjs";
import {StoriesRestService} from "../services/stories-rest.service";
import {MatSnackBar} from "@angular/material";

export interface Story{
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
	styles: [`.story-item {
		font-size: 25px;
		padding: 15px 10px;
		border: 2px solid white;
	}`],
})
export class StoriesComponent implements OnInit{
	storiesList: Story[];
	isLoading: boolean;
	// breakpoint: number;
	// currentItemsToShow: Story[];

// 	private searchTerms = new Subject<string>();
//
// 	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
// 	length = 20;
// 	pageSizeOptions = [8, 20, 40, 50];
//
	constructor(private rest: StoriesRestService,
				private _snackBar: MatSnackBar,
				// private dialog: MatDialog,
	) { }

	ngOnInit(): void {
		this.isLoading = true;
		this.getStartStories();
		// this.getSeries();
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
				// this.currentItemsToShow = data.slice(0, 20);
				this.isLoading = false;
			})
	}
	// 	search(userString: string) {
// 		this.searchTerms.next(userString);
// 	}
//
// 	onPageChanges($event) {
// 		this.currentItemsToShow = this.seriesList.slice
// 		($event.pageIndex * $event.pageSize, $event.pageIndex * $event.pageSize + $event.pageSize);
// 	}
//
	//
// 	ngDoCheck(): void {
// 		this.setBreakpoint();
// 	}
//
// 	setBreakpoint() {
// 		switch (true) {
// 			case window.innerWidth > 2000:
// 				this.breakpoint = 5;
//
// 				break;
//
// 			case window.innerWidth > 1400:
// 				this.breakpoint = 4;
//
// 				break;
//
// 			case window.innerWidth > 800:
// 				this.breakpoint = 2;
//
// 				break;
//
// 			case window.innerWidth < 800:
// 				this.breakpoint = 1;
// 		}
// 	openDialog(selectedHero: object) {
// 		this.dialog.open(HeroDialogComponent, {
// 			width: '90vh',
// 			data: selectedHero,
// 		});
// 	}
}

