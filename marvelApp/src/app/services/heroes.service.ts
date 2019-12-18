import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
	providedIn: 'root'
})

export class HeroesService {
	publicKey = '261184743b3ca5f2464aa5f310961b29';
	hash = '40273ff47a9a7d2a9db8a59eefbb232a';
	urlAPI = `https://gateway.marvel.com:443/v1/public/characters?limit=25&ts=1&apikey=
	${this.publicKey}&hash=${this.hash}`;

	constructor(private http: HttpClient) {}

	getHeroes() {
		return this.http.get(this.urlAPI);
	}
}
