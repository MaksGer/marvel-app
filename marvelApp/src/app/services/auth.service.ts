import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root'
})

export class AuthService {
	activeUser: object;

	getData(key: string) {
		if (JSON.parse(localStorage.getItem(key))) {
			return this.activeUser = JSON.parse(localStorage.getItem(key));

		} else {
			return null;
		}
	}

	setData(email: string, password: string, name: string): void {
		localStorage.setItem(email, JSON.stringify({
			password: password,
			name: name,
		}))
	}
}
