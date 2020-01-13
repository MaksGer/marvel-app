import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Event} from '../../events/events.component';
import {Item} from '../../grid-for-tabs/grid-for-tabs.component';

@Component({
  selector: 'app-events-dialog',
  templateUrl: './events-dialog.component.html',
  styleUrls: ['./events-dialog.component.css']
})


export class EventsDialogComponent {

	constructor(
		public dialogRef: MatDialogRef<EventsDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public event: Item,
	) { }

	close(): void {
		this.dialogRef.close();
	}
}
