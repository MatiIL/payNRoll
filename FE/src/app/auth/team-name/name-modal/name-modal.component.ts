import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameFormComponent } from '../name-form/name-form.component'; // Adjust the path as needed

@Component({
  selector: 'app-team-name-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Generate Team Name</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
    </div>
    <div class="modal-body">
      <app-name-form></app-name-form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
})
export class NameModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
