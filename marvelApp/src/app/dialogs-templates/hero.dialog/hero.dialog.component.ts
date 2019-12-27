import {
	AfterContentInit,
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Inject,
	OnInit,
	ViewChild
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Hero} from "../../heroes/heroes.component";
import {HeroesRestService} from "../../services/heroes-rest.service";
import {delay} from "rxjs/operators";
import {NguCarousel, NguCarouselConfig} from "@ngu/carousel";

export interface Comics {
	title: string,
	thumbnail: {
		path: string,
		extension: string,
	}
}

@Component({
	// changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hero.dialog',
  templateUrl: './hero.dialog.component.html',
  styleUrls: ['./hero.dialog.component.css']
})
export class HeroDialogComponent implements OnInit, AfterViewInit{
	slideNo = 0;
	isLoading = true;
	listOfComics: Comics[];


	@ViewChild('myCarousel', {static: false}) myCarousel: NguCarousel<[Comics]>;
	carouselConfig: NguCarouselConfig = {
		grid: { xs: 3, sm: 3, md: 3, lg: 4, all: 0 },
		interval: {timing: 4000, initialDelay: 1000},
		// load: 1,
		loop: false,
		touch: true,
		velocity: 0.2
	};

	constructor(
		public dialogRef: MatDialogRef<HeroDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public hero: Hero,
		private rest: HeroesRestService,
		private cdr: ChangeDetectorRef,
	) { }

	ngOnInit(): void {
		this.rest.getComicsForHero(this.hero.id)
			.pipe(
			delay(1000)
			)
			.subscribe(
			data => {
				console.log(data);
				this.listOfComics = data;

				this.isLoading = false;
			}
		)
	}

	close(): void {
		this.dialogRef.close();
	}

	ngAfterViewInit() {
		console.log(this.cdr.detectChanges());

	}

	// reset() {
	// 	this.myCarousel.reset(!this.resetAnim);
	// }
	//
	// moveTo(slide) {
	// 	this.myCarousel.moveTo(slide, !this.withAnim);
	// }
}
