import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class HeroesService {
	publicKey = 'apikey=261184743b3ca5f2464aa5f310961b29';
	urlAPI = `https://gateway.marvel.com/v1/public/characters?`;

	constructor(private http: HttpClient) {}

	getHeroes(): Observable<any> {
		return this.http.get(this.urlAPI + this.publicKey);
	}

	getHeroesFromUserSearch(name: string): Observable<any> {
		return this.http.get( this.urlAPI + `nameStartsWith=${name}&` + this.publicKey);
	}
}
