import {Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Event, Router} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'marvelApp';
	timeout;
	routerChanged = true;
	constructor(private router: Router) {
		router.events.subscribe((event: Event) => {

			if (event instanceof NavigationStart) {
				this.routerChanged = true;
			}

			if (event instanceof NavigationEnd) {
				this.timeout = setTimeout(() => {
					clearTimeout(this.timeout);
					this.routerChanged = false;
				}, 700);
			}
		});
	}
}
