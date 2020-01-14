import {Injectable, TemplateRef} from '@angular/core';
import {EventsDialogComponent} from '../dialogs-templates/events-dialog/events-dialog.component';
import {MatDialog} from '@angular/material';

@Injectable({
	providedIn: 'root'
})
export class DataForGridComponentService {

	component = null;

	constructor(
		public dialog: MatDialog,
	) {
	}

	openDialog(selectedItem) {
		this.dialog.open(this.component, {
			width: '50vw',
			data: selectedItem,
		});
	}
}
