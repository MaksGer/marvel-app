import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-authentication-form',
	templateUrl: './authentication-form.component.html',
	styleUrls: ['./authentication-form.component.css'],
})

export class AuthenticationFormComponent implements OnInit {
	isLoginExist: boolean = true;
	formToSignUp: FormGroup;
	formToLogIn: FormGroup;
	emailPattern: string = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
	constructor(private _snackBar: MatSnackBar,
				private authService: AuthService,
				private router: Router,) {}

	ngOnInit() {
		this.formToSignUp = new FormGroup({
			email: new FormControl(null, [
				Validators.pattern(this.emailPattern),
			]),
			name: new FormControl('', []),
			password: new FormControl(null, [
				Validators.minLength(8),
			]),
		});

		this.formToLogIn = new FormGroup({
			login: new FormControl('', [
				Validators.required,
				Validators.pattern(this.emailPattern),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(8),
			]),
		});
	}

	submitSignUp() {
		this.authService.setData(
			this.formToSignUp.value.email,
			this.formToSignUp.value.password,
			this.formToSignUp.value.name
		);
		this.isLoginExist = true;
		this.formToSignUp.reset();
	}

	submitLogIn() {
		if(this.authService.getData(this.formToLogIn.value.login)) {
			this.router.navigate(['/main']);
		} else {
			this._snackBar.open('Please check your Login and Password and try again', 'Close', {
				duration: 4000,
				verticalPosition: 'top',
				horizontalPosition: 'center',
				panelClass: 'error-snack-bar',
			});
		}
	}

	changeForm(form: FormGroup) {
		this.isLoginExist = !this.isLoginExist;
		form.reset();
	}
}
