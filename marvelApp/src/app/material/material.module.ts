import {NgModule} from '@angular/core';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatTableModule,
	MatToolbarModule,
	MatIconModule,
	MatGridListModule,
	MatPaginatorModule,
	MatCardModule,
	MatSelectModule,
} from "@angular/material";


const MaterialComponents = [
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatToolbarModule,
	MatTableModule,
	MatIconModule,
	MatGridListModule,
	MatPaginatorModule,
	MatCardModule,
	MatSelectModule,
];

@NgModule({
	imports: [MaterialComponents],
	exports: [MaterialComponents]
})
export class MaterialModule {
}
