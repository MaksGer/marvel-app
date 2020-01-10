import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Series} from "../../series/series.component";

@Component({
  selector: 'app-series-dialog',
  templateUrl: './series-dialog.component.html',
  styleUrls: ['./series-dialog.component.css']
})
export class SeriesDialogComponent {

constructor(
		public dialogRef: MatDialogRef<SeriesDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public series: Series,
	) { }

	close(): void {
		this.dialogRef.close();
	}
}
