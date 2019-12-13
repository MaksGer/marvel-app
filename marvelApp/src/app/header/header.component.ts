import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	constructor(private authService: AuthService) {}

	links = ['heroes', 'comics', 'creators', 'events', 'series', 'stories', 'favorites'];
	activeLink = this.links[0];

	setActiveLink(e): void {
		console.log(e);
		this.activeLink = this.links[e];
	}

	ngOnInit() {
		console.log(this.activeLink);
	}

}
