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
import { AddNewUserGQL } from '../../../generated-types';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from '../../../../../shared/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../team-name/name-modal/name-modal.component';

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
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  getErrorMessage(control: AbstractControl | null) {
    if (control?.hasError('required')) return 'שדה חובה';
    if (control?.hasError('email')) return 'נא להכניס כתובת מייל תקינה';
    if (control?.hasError('minlength')) return 'הסיסמה צריכה להכיל לפחות 6 תווים';
    return '';
  }

  openTeamNameModal(e: any) {
    e.preventDefault();
    this.modalService.open(NameModalComponent);
  }

  onSubmit(form: FormGroup) {
    if (!this.noAccount) {
      const loginInput = {
        email: form.get('email')?.value || '',
        password: form.get('password')?.value || '',
      };
      this.authService.login(loginInput).subscribe((response) => {
        const userProperties = response.body.user;
        this.userService.updateUser(userProperties);
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
            const newUserData = data.addNewUser;
            const newUser: User = {
              _id: newUserData.userId,
              email: '', 
              password: '', 
              firstName: newUserData.firstName,
              lastName: '', 
              teamName: newUserData.teamName,
            };
            this.userService.updateUser(newUser);
            form.reset();
            this.authSuccess.emit();
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
