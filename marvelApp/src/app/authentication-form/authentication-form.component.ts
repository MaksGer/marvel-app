import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
	selector: 'app-authentication-form',
	templateUrl: './authentication-form.component.html',
	styleUrls: ['./authentication-form.component.css'],
})

export class AuthenticationFormComponent implements OnInit {
	isLoginExist = true;
	formToSignUp: FormGroup;
	formToLogIn: FormGroup;
	emailPattern = '^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$';
	constructor(private _snackBar: MatSnackBar) {}

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
		localStorage.setItem(this.formToSignUp.value.email, JSON.stringify({
			password: this.formToSignUp.value.password,
			name: this.formToSignUp.value.name,
		}));

		this.isLoginExist = true;
		this.formToSignUp.reset();
	}

	submitLogIn() {
		const returnObj = JSON.parse(localStorage.getItem(this.formToLogIn.value.login));

		if(returnObj && returnObj.password === this.formToLogIn.value.password) {
			this.formToLogIn.reset();
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
