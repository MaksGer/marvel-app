import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class RandomBackgroundService {
	bgColor: string;
	bgClass: string;
	private resultOfRandom: number;
	private themes = {
		1: {
			backgroundColor: '#070fd7',
			backgroundClass: 'bg1',
		},
		2: {
			backgroundColor: '#5e2396',
			backgroundClass: 'bg2',
		},
		3: {
			backgroundColor: '#bf6d1b',
			backgroundClass: 'bg3',
		},
		4: {
			backgroundColor: '#d42e1b',
			backgroundClass: 'bg4',
		},
	};

	constructor () {
		let arrayOfArgs = this.getRandom();
		this.bgColor = arrayOfArgs[0];
		this.bgClass = arrayOfArgs[1];
	}

	getRandom(): any {
		this.resultOfRandom = Math.ceil(Math.random() * 4);
		return [this.themes[this.resultOfRandom].backgroundColor,
			this.themes[this.resultOfRandom].backgroundClass];
	}
}
