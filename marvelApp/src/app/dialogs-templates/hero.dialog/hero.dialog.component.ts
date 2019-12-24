import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Hero} from "../../heroes/heroes.component";

@Component({
  selector: 'app-hero.dialog',
  templateUrl: './hero.dialog.component.html',
  styleUrls: ['./hero.dialog.component.css']
})
export class HeroDialogComponent  {

	constructor(
		public dialogRef: MatDialogRef<HeroDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public hero: Hero,
	) { }

	close(): void {
		this.dialogRef.close();
	}
}
