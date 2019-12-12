import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
	selector: 'app-main-page',
	templateUrl: './main-page.component.html',
	styles: [],
})

export class MainPageComponent implements OnInit {
	constructor(private authService: AuthService) { }

	ngOnInit() {}
}
