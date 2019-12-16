import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomBackgroundService {
	resultOfRandom: number;

	getRandom (): void {
		this.resultOfRandom = Math.ceil(Math.random() * 4);
	}

	// createConfigObject(a,b,c,d) {
	// 	return {
	// 		this.a: RandomBackgroundService.resultOfRandom == 1,
	// 		arguments[1]: this.resultOfRandom == 2,
	// 		arguments[2]: this.resultOfRandom == 3,
	// 		arguments[3]: this.resultOfRandom == 4,
	// 	}
	// }
}
