import { Component, OnInit } from '@angular/core';
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
        Validators.minLength(2)
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl('', [
        Validators.email,
        Validators.required
      ])
    });

    this.formToLogIn = new FormGroup({
      login: new FormControl('', [
        Validators.required,
        Validators.minLength(2)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    })
  }

  submitSignUp() {
    localStorage.setItem(this.formToSignUp.value.name, JSON.stringify({
      password: this.formToSignUp.value.password,
      email: this.formToSignUp.value.email
    }));

    this.isLoginExist = true;
  };

  submitLogIn() {
    let returnObj = JSON.parse(localStorage.getItem(this.formToLogIn.value.login));

    switch (true) {
      case !localStorage.getItem(this.formToLogIn.value.login):
      case returnObj.password != this.formToLogIn.value.password:
        this.isLoginAndPassValid = false;

        break;

      case returnObj.password === this.formToLogIn.value.password:
        this.isLoginAndPassValid = true;
    }
  };
}
