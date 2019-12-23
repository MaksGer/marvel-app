import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Hero} from "../heroes/heroes.component";
import {map} from "rxjs/operators";


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

	getHeroesFromUserSearch(name: string): Observable<Hero[]> {
		return this.http.get<Hero[]>(`https://gateway.marvel.com/v1/public/characters?nameStartsWith=${name}&apikey=261184743b3ca5f2464aa5f310961b29`);
	}
}
