import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {SeriesDialogComponent} from '../dialogs-templates/series-dialog/series-dialog.component';
import {HeroDialogComponent} from '../dialogs-templates/hero-dialog/hero-dialog.component';


export interface Item {
	id: number,
	title?: string,
	name?: string,
	fullName?: string,
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
	@Input() component: 'origin' | 'hero' | 'story';

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
	// Without @Inject
		openDialog(selectedItem: Item) {
			switch (true) {
				case this.component == 'origin':
					SeriesDialogComponent.open(this.dialog, selectedItem);

					break;

				case this.component == 'hero':
					HeroDialogComponent.open(this.dialog, selectedItem);

					break;

				case this.component == 'story':
					return null;
			}

		}


	// With Inject
	// openDialog(selectedItem: object) {
	// 	this.dialog.open(EventsDialogComponent, {
	// 		width: '50vw',
	// 		data: selectedItem,
	// 	});
	// }
}
