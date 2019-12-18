import {Component, OnInit} from '@angular/core';
import {HeroesService} from "../services/heroes.service";

@Component({
	selector: 'app-heroes',
	templateUrl: './heroes.component.html',
	styles: []
})

export class HeroesComponent implements OnInit {
	heroesList;

	constructor(private heroes: HeroesService) {
	}

	ngOnInit() {
		this.heroes.getHeroes().subscribe(response => {
				this.heroesList = response.data.results;
			}
		);
	}
}
