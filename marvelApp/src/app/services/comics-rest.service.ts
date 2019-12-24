import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ComicsRestService {
	publicKey = '261184743b3ca5f2464aa5f310961b29';
	urlAPI = `https://gateway.marvel.com/v1/public/comics`;

  constructor (
  	private http: HttpClient,
	) { }

	getComics() {
		return this.http.get(this.urlAPI, {
			params: new HttpParams().set('apikey', this.publicKey),
		} );
	}
}
