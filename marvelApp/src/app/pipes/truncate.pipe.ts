import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
	name: 'truncate',
})

export class TruncatePipe implements PipeTransform {
	transform(value: string): string {
		return value.length > 30 ? value.substr(0, 30) + '...' : value;
	}
}
