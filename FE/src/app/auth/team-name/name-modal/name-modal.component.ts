import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameFormComponent } from '../name-form/name-form.component'; // Adjust the path as needed

@Component({
  selector: 'app-name-modal',
  templateUrl: './name-modal.component.html',
  styleUrls: ['./name-modal.component.scss'],
})
export class NameModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
