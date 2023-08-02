import { Component, ViewEncapsulation, Input } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class AuthFormComponent {
  @Input() noAccount: boolean = false;

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    teamName: new FormControl(''),
  });

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  getErrorMessage(control: AbstractControl | null) {
    if (control && control.hasError('required')) {
      return 'נא להכניס כתובת מייל תקינה!';
    }

    return control && control.hasError('email')
      ? 'נא להכניס כתובת מייל תקינה!'
      : '';
  }

  onSubmit(form: FormGroup) {
    if (this.noAccount) {
      //code for signup
      console.log(form.value);
    } else {
      console.log(form.value);
      form.reset();
    }
  }
}
