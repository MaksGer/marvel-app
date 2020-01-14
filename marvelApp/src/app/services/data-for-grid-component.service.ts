import {Injectable, TemplateRef} from '@angular/core';
import {EventsDialogComponent} from '../dialogs-templates/events-dialog/events-dialog.component';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';

@Injectable({
	providedIn: 'root'
})
export class DataForGridComponentService {


	constructor(
		public dialog: MatDialog,
		public event: EventsDialogComponent,
	) {

	}

}
