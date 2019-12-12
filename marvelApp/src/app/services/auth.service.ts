import {Injectable} from '@angular/core';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private login: string, password: string) {
		let returnObj = JSON.parse(localStorage.getItem(login));
		if (returnObj && returnObj.password === password) {
			console.log('Auth was success');
		}
	}

}
