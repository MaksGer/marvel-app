import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Series} from '../../series/series.component';
import {GridForTabsComponent, Item} from '../../grid-for-tabs/grid-for-tabs.component';

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
	) { }

	close(): void {
		this.dialogRef.close();
	}
}
