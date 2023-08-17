import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-name-modal',
  templateUrl: './name-modal.component.html',
  styleUrls: ['./name-modal.component.scss'],
})
export class NameModalComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
