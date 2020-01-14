import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {of, Subject} from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Event} from '../events/events.component';
import {EventsDialogComponent} from '../dialogs-templates/events-dialog/events-dialog.component';
import {MatDialog} from '@angular/material';
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
		public dialog: MatDialog,
	) {
	}

	breakpoint: number;

	ngOnInit(): void {
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

	openDialog(selectedItem: object) {


		this.dialog.open(EventsDialogComponent, {
			width: '50vw',
			data: selectedItem,
		});
	}
}
