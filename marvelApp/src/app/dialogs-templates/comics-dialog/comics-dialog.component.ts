import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Comics} from '../../comics/comics.component';

@Component({
	selector: 'app-comics-dialog',
	templateUrl: './comics-dialog.component.html',
	styleUrls: ['./comics-dialog.component.css']
})
export class ComicsDialogComponent {

	constructor(
		public dialogRef: MatDialogRef<ComicsDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public comics: Comics,
	) { }

	close(): void {
		this.dialogRef.close();
	}
}
