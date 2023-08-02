import { Component, ViewEncapsulation, Input } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, NgIf],
})
export class AuthFormComponent {
  @Input() noAccount: boolean = false;
  
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  firstName = new FormControl('', [Validators.required]);
  lastName = new FormControl('', [Validators.required]);
  teamName = new FormControl('');

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'נא להכניס כתובת מייל תקינה!';
    }

    return this.email.hasError('email') ? 'נא להכניס כתובת מייל תקינה!' : '';
  }
}
