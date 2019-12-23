import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Hero} from "../heroes/heroes.component";


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

	getHeroesFromUserSearch(name: string): Observable<any> {
		return this.http.get("https://gateway.marvel.com/v1/public/characters?nameStartsWith=spider&apikey=261184743b3ca5f2464aa5f310961b29");
	}
}
