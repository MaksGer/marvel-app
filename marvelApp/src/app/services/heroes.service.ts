import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";


@Injectable({
	providedIn: 'root'
})

export class HeroesService {
	publicKey = '261184743b3ca5f2464aa5f310961b29';
	urlAPI = `https://gateway.marvel.com/v1/public/characters?apikey=
	${this.publicKey}`;

	constructor(private http: HttpClient) {}

	getHeroes(): Observable<any> {
		return this.http.get(this.urlAPI);
	}

	getHeroesFromUserSearch(): Observable<any> {
		return  this.http.get("write here url string");
	}
}
