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
import {MatIconModule} from '@angular/material/icon';
import { Apollo } from 'apollo-angular';
import { gql } from 'graphql-tag';

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

  constructor(private apollo: Apollo) {}

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
      const signupInput = {
        email: form.get('email')?.value || '',
        password: form.get('password')?.value || '',
        firstName: form.get('firstName')?.value || '',
        lastName: form.get('lastName')?.value || '',
        teamName: form.get('teamName')?.value || null,
      };

      const SIGNUP_MUTATION = gql`
        mutation AddNewUser($user: CreateUserInput!) {
          addNewUser(user: $user) {
            userId
            firstName
            teamName
          }
        }
      `;

      this.apollo
        .mutate({
          mutation: SIGNUP_MUTATION,
          variables: { user: signupInput },
        })
        .subscribe({
          next: ({ data }) => {
            // Handle success, possibly redirect the user or show a success message
            console.log('Signup successful:', data);
            form.reset(); // Clear the form after successful signup
          },
          error: (error) => {
            console.error('Signup error:', error);
            if (error.networkError) {
              console.error('Network error:', error.networkError);
            }
            if (error.graphQLErrors) {
              console.error('GraphQL errors:', error.graphQLErrors);
            }
          },
        });
    } else {
      console.log(form.value);
      form.reset();
    }
  }
}
