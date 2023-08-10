import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
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
import { AddNewUserGQL } from '../../../../generated-types';
import { LoginService } from '../../login.service';

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
  @Output() authSuccess = new EventEmitter<void>();
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
    private loginService: LoginService
  ) {}

  // getErrorMessage(control: AbstractControl | null) {
  //   if (control && control.hasError('required')) {
  //     return 'נא להכניס כתובת מייל תקינה!';
  //   }
  //   return control && control.hasError('email')
  //     ? 'נא להכניס כתובת מייל תקינה!'
  //     : '';
  // }

  getErrorMessage(control: AbstractControl | null) {
    if (control?.hasError('required')) {
      return 'שדה חובה';
    }
  
    if (control?.hasError('email')) {
      return 'נא להכניס כתובת מייל תקינה';
    }
  
    if (control?.hasError('minlength')) {
      return 'הסיסמה צריכה להכיל לפחות 6 תווים';
    }
  
    return '';
  }

  onSubmit(form: FormGroup) {
    if (!this.noAccount) {
      const loginInput = {
        email: form.get('email')?.value || '',
        password: form.get('password')?.value || '',
      };
      this.loginService.login(loginInput).subscribe((response) => {
        const userProperties = response.body.user; 
        console.log('User Properties:', userProperties);
        form.reset();
        this.authSuccess.emit();
      });
    } else {
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
            this.authSuccess.emit();
            form.reset();
          } else
            console.error(
              'Signup error: No data returned or addNewUser is null/undefined'
            );
        },
        error: (error) => console.error('Signup error:', error),
      });
    }
  }
}
