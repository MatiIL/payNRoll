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
import { environment } from '../../../environments/environment';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AddNewUserGQL } from '../../../generated-types';
import { AuthService } from '../auth.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from '../../schemas/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../team-name/name-modal/name-modal.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { GeneratedNamesService } from './gen-names.service';

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
    MatProgressBarModule,
    NgIf,
  ],
})
export class AuthFormComponent {
  @Input() noAccount: boolean = false;
  @Output() authSuccess = new EventEmitter<void>();
  hide: boolean = true;
  loading: boolean = false;
  generatedNames: string[] = [];
  signupCode = environment.signupCode;

  startLoading() {
    this.loading = true;
  }

  teamNameFormControl: FormControl = new FormControl('');

  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    signupCode: new FormControl('', [
      Validators.required,
      this.validateSignupCode.bind(this),
    ]),
    teamName: this.teamNameFormControl,
  });

  validateSignupCode(control: AbstractControl): { [key: string]: any } | null {
    const enteredCode = control.value;
    const actualCode = this.signupCode;
    if (enteredCode !== actualCode) {
      return { invalidSignupCode: true };
    }
    return null;
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private addNewUserGQL: AddNewUserGQL,
    private authService: AuthService,
    private userService: UserService,
    private modalService: NgbModal,
    private genNamesService: GeneratedNamesService,
  ) {}

  ngOnInit(): void {
    this.genNamesService.clickedNameEmitter.subscribe((name: string) => {
      this.teamNameFormControl.setValue(name);
    });
  }

  getErrorMessage(control: AbstractControl | null) {
    if (control?.hasError('required')) return 'שדה חובה';
    if (control?.hasError('email')) return 'נא להכניס כתובת מייל תקינה';
    if (control?.hasError('minlength')) return 'סיסמה קצרה מדי!';
    if (control?.hasError('signupCode')) return 'קוד הרשמה אינו תקין';
    return '';
  }

  openTeamNameModal(e: any) {
    e.preventDefault();
    this.modalService.open(NameModalComponent, {
      size: 'xl',
      fullscreen: true,
    });
  }

  onSubmit(form: FormGroup) {
    this.loading = true;
    if (!this.noAccount) {
      const loginInput = {
        email: form.get('email')?.value || '',
        password: form.get('password')?.value || '',
      };
      this.authService.login(loginInput).subscribe((response) => {
        const userProperties = response.body.user;
        this.userService.updateUser(userProperties);
        this.loading = false;
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
        isAdmin: false,
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
              isAdmin: false,
            };
            this.userService.updateUser(newUser);
            this.loading = false;
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
