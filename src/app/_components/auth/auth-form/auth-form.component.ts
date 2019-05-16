import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../../_providers/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  errorMessage: string;

  constructor(private authP: AuthService,
              private router: Router) { }

  @Input() formType: string;
  authForm: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.authForm = new FormGroup({
      userEmail: new FormControl('', [Validators.email, Validators.required]),
      userPassword: new FormControl('', Validators.required),
    });

    if (this.formType === 'register') {
      this.authForm.addControl('userName', new FormControl('', Validators.required));
      this.authForm.addControl('userSurname', new FormControl(''));
    } else if (this.formType === 'login') {
      this.authForm.addControl(      'remember', new FormControl(''));
    }
  }

  onSubmit() {
    if (this.formType === 'register') {
      this.authP.signIn(this.authForm.value).subscribe(() => {
        this.router.navigate(['/']);
      }, errorData => {
        this.errorMessage = errorData.error;
        this.authForm.get('userEmail').setErrors({'incorrect': true});
        this.hideErrors();
      });
    } else if (this.formType === 'login') {
      this.authP.logIn(this.authForm.value).subscribe(() => {
        this.router.navigate(['/']);
      }, errorData => {
        this.errorMessage = errorData.error;
        this.hideErrors();
      });
    }
  }

  hideErrors() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

}
