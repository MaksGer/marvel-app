import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Item} from '../../grid-for-tabs/grid-for-tabs.component';

@Component({
	selector: 'app-series-dialog',
	templateUrl: './series-dialog.component.html',
	styleUrls: ['./series-dialog.component.css'],
	providers: [],
})

export class SeriesDialogComponent {
	data: Item;

	static open(dialog: MatDialog, data: Item) {
		let dialogRef = dialog.open(SeriesDialogComponent, {width: '50vw'});

		dialogRef.componentInstance.data = data;

		return dialogRef;
	}

	constructor(
		public dialogRef: MatDialogRef<SeriesDialogComponent>,
		public dialog: MatDialog,
	) {
	}

	close(): void {
		this.dialogRef.close();
	}
}
