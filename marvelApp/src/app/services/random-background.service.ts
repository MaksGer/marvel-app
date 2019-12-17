import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RandomBackgroundService {
	resultOfRandom: number;
	themes = {
		1: {
			'backgroundColor': '#070fd7',
			'color': '#070fd7',
			'background': 'bg1',
		},
		2: {
			'backgroundColor': '#5e2396',
			'color': '#5e2396',
			'background': 'bg2',
		},
		3: {
			'backgroundColor': '#bf6d1b',
			'color': '#bf6d1b',
			'background': 'bg3',
		},
		4: {
			'backgroundColor': '#d42e1b',
			'color': '#d42e1b',
			'background': 'bg4',
		},
	};

	getRandom(): void {
		this.resultOfRandom = Math.ceil(Math.random() * 4);
	}

	getStyleTheme() {
		return this.themes[this.resultOfRandom];
	}
}
