import {Component, DoCheck, OnInit, ViewChild} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {catchError, debounceTime, delay, map, switchMap} from "rxjs/operators";
import {Observable, Subject, throwError} from "rxjs";
import {MatPaginator, MatSnackBar, MatTableDataSource, PageEvent} from "@angular/material";
import {of} from "rxjs/internal/observable/of";
import {distinctUntilChanged} from "rxjs/internal/operators/distinctUntilChanged";

export interface Hero {
	id: number,
	name: string,
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
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit, DoCheck {
	heroesList: Hero[];
	heroes$: Observable<Hero[]>;
	isLoading: boolean;
	breakpoint: number;
	private searchTerms = new Subject<string>();

	@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
	length = 20;
	pageSize = 8;
	pageSizeOptions = [ 8, 20, 40, 60];
	pageEvent: PageEvent;
	currentPage = 0;
	array: any;
	dataSource: [];
	totalSize = 0;

	constructor(private heroes: HeroesService,
				private _snackBar: MatSnackBar,
	) {

	}

	ngOnInit() {
		this.isLoading = true;
		this.heroes.getHeroes()
			.pipe(
				delay(1000),
				map( (response: any) => response.data.results),
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
				this.heroesList = response;
				this.isLoading = false;
				// this.dataSource = new MatTableDataSource<Element>(response);
				// this.dataSource.paginator = this.paginator;
				// this.array = response;
				// this.totalSize = this.array.length;
				// this.iterator();
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

	search(userString: string) {
		this.searchTerms.next(userString);
		this.searchTerms
			.pipe(
				debounceTime(2000),
				distinctUntilChanged(),
				switchMap((term: string) => this.heroes.getHeroesFromUserSearch(term)),
				map((response: any) => response.data.results)
			)
			.subscribe((response: any) => {
				this.heroesList = response;
				// this.dataSource = new MatTableDataSource<Element>(response);
				// this.dataSource.paginator = this.paginator;
				// this.array = response;
				// this.totalSize = this.array.length;
				// this.iterator();
			})

	}
	public handlePage(e: any) {
		this.currentPage = e.pageIndex;
		this.pageSize = e.pageSize;
		this.iterator();
	}

	private iterator() {
		const end = (this.currentPage + 1) * this.pageSize;
		const start = this.currentPage * this.pageSize;
		const part = this.array.slice(start, end);
		this.dataSource = part;
	}
}

