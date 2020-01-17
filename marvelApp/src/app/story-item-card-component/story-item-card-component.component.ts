import {Component, Input, OnInit} from '@angular/core';
import {Story} from '../stories/stories.component';

@Component({
	selector: 'app-story-item-card-component',
	templateUrl: './story-item-card-component.component.html',
	styleUrls: ['./story-item-card-component.component.css'],
})

export class StoryItemCardComponentComponent implements OnInit {
	@Input() data: Story;
	@Input() index: number;
	isDescrSet: boolean;
	title: string;

	ngOnInit() {
		this.title = 'Story ' + this.index;
	}

	setStory() {
		this.isDescrSet = true;
		this.title = this.data.title;
	}

	returnTitle() {
		this.isDescrSet = false;
		this.title = 'Story ' + this.index;
	}
}
