import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Creator} from "../../creators/creators.component";

@Component({
  selector: 'app-creators-dialog',
  templateUrl: './creators-dialog.component.html',
  styleUrls: ['./creators-dialog.component.css']
})
export class CreatorsDialogComponent {


	constructor(
		public dialogRef: MatDialogRef<CreatorsDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public creator: Creator,
	) { }

	close(): void {
		this.dialogRef.close();
	}
}
