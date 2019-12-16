import {Component} from '@angular/core';
import {RandomBackgroundService} from "../services/random-background.service";

@Component({
	selector: 'app-comics',
	templateUrl: './comics.component.html',
	styles: []
})
export class ComicsComponent {
	constructor (private random: RandomBackgroundService) {

}
}
