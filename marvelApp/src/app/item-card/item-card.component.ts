import {Component, Input, OnInit} from '@angular/core';
import {EventsDialogComponent} from '../dialogs-templates/events-dialog/events-dialog.component';
import {MatDialog} from '@angular/material';
import {Item} from '../grid-for-tabs/grid-for-tabs.component';



@Component({
	selector: 'app-item-card',
	templateUrl: './item-card.component.html',
	styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
	@Input() item: Item;

	constructor(private dialog: MatDialog) {
	}

	ngOnInit() {
		// console.log(this.item)
	}

	openDialog(selectedItem: object) {
		this.dialog.open(EventsDialogComponent, {
			width: '50vw',
			data: selectedItem,
		});
	}
}
