import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent {
	constructor(private authService: AuthService,
				private router: Router,
				) { }

	links = ['heroes', 'comics', 'creators', 'events', 'series', 'stories', 'favorites'];
	activeLink: string;

	logout() {
		sessionStorage.clear();
	}
}