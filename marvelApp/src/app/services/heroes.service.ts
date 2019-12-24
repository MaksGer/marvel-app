import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})

export class HeroesService {
	publicKey = '261184743b3ca5f2464aa5f310961b29';
	urlAPI = `https://gateway.marvel.com/v1/public/characters`;

	constructor(private http: HttpClient) {}

	getHeroes(): Observable<any> {
		return this.http.get(this.urlAPI, {
			params: new HttpParams().set('apikey', this.publicKey),
		} );
	}

	getHeroesFromUserSearch(name: string): Observable<any> {
		let params = new HttpParams();

		params = params.append('nameStartsWith', name);
		params = params.append('apikey', this.publicKey);

		return this.http.get( this.urlAPI, {
			params
		} );
	}
}
// return this.http.get( this.urlAPI + `nameStartsWith=${name}&` + this.publicKey);
