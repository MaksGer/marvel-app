import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-authentication-form',
	templateUrl: './authentication-form.component.html',
	styleUrls: ['./authentication-form.component.css']
})

export class AuthenticationFormComponent implements OnInit {
	isLoginExist: boolean = true;
	isLoginAndPassValid: boolean = true;
	formToSignUp: FormGroup;
	formToLogIn: FormGroup;

	ngOnInit() {
		this.formToSignUp = new FormGroup({
			name: new FormControl('', [
				Validators.required,
				Validators.minLength(2),
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.minLength(5)
			]),
			email: new FormControl(null, [
				Validators.required,
				Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
			])
		});

		this.formToLogIn = new FormGroup({
			login: new FormControl('', [
				Validators.required,
				Validators.pattern('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])')
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(5)
			])
		});
	};

	submitSignUp() {
		localStorage.setItem(this.formToSignUp.value.email, JSON.stringify({
			password: this.formToSignUp.value.password,
			name: this.formToSignUp.value.name
		}));

		this.isLoginExist = true;
		this.formToSignUp.reset();
	};

	submitLogIn() {
		let returnObj = JSON.parse(localStorage.getItem(this.formToLogIn.value.login));

		this.isLoginAndPassValid = returnObj && returnObj.password === this.formToLogIn.value.password;
		this.formToLogIn.reset();
	};

	changeForm(form: FormGroup) {
		this.isLoginExist = !this.isLoginExist;
		form.reset();
	}
}
