import {Component, Input, OnInit} from '@angular/core';
import {EventsDialogComponent} from '../dialogs-templates/events-dialog/events-dialog.component';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {Item} from '../grid-for-tabs/grid-for-tabs.component';
import {DataForGridComponentService} from '../services/data-for-grid-component.service';



@Component({
	selector: 'app-item-card',
	templateUrl: './item-card.component.html',
	styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
	@Input() item: Item;

	constructor(
		private dialog: MatDialog,
		// public data: DataForGridComponentService,
	) {
	}

	ngOnInit() {
		// console.log(this.item)
	}

	openDialog(selectedItem: object) {
		//
		// let config = new MatDialogConfig();
		//
		// config.data = selectedItem;
		// config.width = '50vw';
		//
		// this.data.openDialog(config);

		// this.dialog.open(EventsDialogComponent, {
		// 	width: '50vw',
		// 	data: selectedItem,
		// });
	}
}
