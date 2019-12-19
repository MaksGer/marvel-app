import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatTableModule,
	MatToolbarModule,
	MatIconModule,
	MatGridListModule,
} from "@angular/material";


const MaterialComponents = [
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatToolbarModule,
	MatTableModule,
	MatIconModule,
	MatGridListModule,
];

@NgModule({
	imports: [MaterialComponents],
	exports: [MaterialComponents]
})
export class MaterialModule {
}
