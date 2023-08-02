import { Component, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthFormComponent } from './auth-form/auth-form/auth-form.component';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
  standalone: true,
  imports: [AuthFormComponent],
})
export class AuthComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}
  noAccount = false;

  toggleLoginSignup() {
    this.noAccount = !this.noAccount;
  }

  ngOnInit(): void {}
}
