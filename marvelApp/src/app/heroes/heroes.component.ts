import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../services/heroes.service";
import {delay} from "rxjs/operators";

export interface Hero {
	id: number,
	name: string,
	description?: string,
	thumbnail: {
		path: string,
		extension: string
	},
	urls: [{
		type: string,
		url: string,
	}],
}

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {
	heroesList: Hero[];
	isLoading: boolean;

	constructor(private heroes: HeroesService) {
	}

	ngOnInit() {
		this.isLoading = true;
		this.heroes.getHeroes()
			.pipe(delay(1000))
			.subscribe(response => {
				this.heroesList = response.data.results;
				this.isLoading = false;
			}
		);
	}
}
