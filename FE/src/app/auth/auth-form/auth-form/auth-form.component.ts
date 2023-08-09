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
import { MatIconModule } from '@angular/material/icon';
import { AddNewUserGQL, ValidateLoginGQL  } from '../../../../generated-types';
import { LoginService } from '../../login.service'

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class AuthFormComponent {
  @Input() noAccount: boolean = false;
  hide = true;

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

  constructor(
    private addNewUserGQL: AddNewUserGQL,
    private loginService: LoginService,
  ) {}

  getErrorMessage(control: AbstractControl | null) {
    if (control && control.hasError('required')) {
      return 'נא להכניס כתובת מייל תקינה!';
    }
    return control && control.hasError('email') ? 'נא להכניס כתובת מייל תקינה!' : '';
  }

  onSubmit(form: FormGroup) {
    if (!this.noAccount) {
      const loginInput = {
        email: form.get('email')?.value || '',
        password: form.get('password')?.value || '',
      };
      
        this.loginService.login(loginInput).subscribe(() => {
          console.log('succesful login!')
        });
      
    } else {
      // Handle signup form
      const signupInput = {
        email: form.get('email')?.value || '',
        password: form.get('password')?.value || '',
        firstName: form.get('firstName')?.value || '',
        lastName: form.get('lastName')?.value || '',
        teamName: form.get('teamName')?.value || '',
      };

      this.addNewUserGQL.mutate({ user: signupInput }).subscribe({
        next: ({ data }) => {
          if (data?.addNewUser) {
            console.log('Signup successful:', data.addNewUser);
            form.reset();
          } else {
            console.error(
              'Signup error: No data returned or addNewUser is null/undefined'
            );
          }
        },
        error: (error) => {
          console.error('Signup error:', error);
        },
      });
    }
  }
}
