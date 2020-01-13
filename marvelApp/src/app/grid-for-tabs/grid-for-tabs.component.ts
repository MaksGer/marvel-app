import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {of, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Event} from '../events/events.component';
// import {MatDialog} from '@angular/material';

export interface Item {
	id: number,
	title?: string,
	name?: string,
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
	selector: 'app-grid-for-tabs',
	templateUrl: './grid-for-tabs.component.html',
	styleUrls: ['./grid-for-tabs.component.css']
})
export class GridForTabsComponent implements OnInit, DoCheck {
	@Input() itemsList: Item[];
	@Input() isSearchActive;
	// @Input() dialogComponent;

	constructor(
		// private dialog: MatDialog
	) { }
	// dataObject: {
	// 	// isSearchActive: boolean,
	// 	itemsList: Item[],
	// };
	// @Output() itemChanges = new EventEmitter();
	// @Output() getInputValue = new EventEmitter <string >();

	breakpoint: number;
	// isLoading: boolean;
	// isSearchActive: boolean;
	// private searchTerms = new Subject<string>();


	// openDialog(selectedItem: object) {
	// 	this.dialog.open(EventsDialogComponent, {
	// 		width: '50vw',
	// 		data: selectedItem,
	// 	});
	// }

	// searchFromInput() {
	// 	const obsNoCharacters = of<string>();
	//
	// 	this.searchTerms
	// 		.pipe(
	// 			debounceTime(1000),
	// 			// tap((a) => {
	// 			// 	this.isSearchActive = true;
	// 			// }),
	// 			distinctUntilChanged(),
	// 			switchMap((term: string) => {
	// 				if (!term) {
	// 					// return this.rest.getEventsFromUserSearch(term);
	// 					return obsNoCharacters;
	// 				}
	// 			})
	// 		)
	// 		.subscribe( (string) => this.getInputValue.emit(string))
	// }

	// search(userString: string) {
	// 	this.searchTerms.next(userString);
	// }
	ngOnInit(): void {
		// console.log(this.itemsList);
		// this.searchFromInput();
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

	// changeLimit(str: any) {
	// 	this.itemChanges.emit(str)
	// }
}
