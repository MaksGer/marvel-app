import {Component, DoCheck, OnInit} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {catchError, delay} from "rxjs/operators";
import {throwError} from "rxjs";
import {MatSnackBar} from "@angular/material";

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
	isLoading: boolean;
	breakpoint: number;

	constructor(private heroes: HeroesService,
				private _snackBar: MatSnackBar,
				) {
	}

	ngOnInit() {
		this.isLoading = true;
		this.heroes.getHeroes()
			.pipe(
				delay(1000),
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
				this.heroesList = response.data.results;
				this.isLoading = false;
			});
	}
	ngDoCheck(): void {
		this.setBreakpoint()
	}

	setBreakpoint() {
		switch (true) {
			case window.innerWidth > 2000:
				this. breakpoint = 5;

				break;

			case window.innerWidth > 1400:
				this. breakpoint = 4;

				break;
			case window.innerWidth > 800:
				this. breakpoint = 2;

				break;
			case window.innerWidth < 800:
				this. breakpoint = 1;

		}
	}
}
