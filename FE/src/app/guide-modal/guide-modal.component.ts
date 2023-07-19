import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-guide-modal',
  standalone: true,
	templateUrl: './guide-modal.component.html',

  styleUrls: ['./guide-modal.component.scss']
})

export class GuideModalComponent {

	@Input() title:any

	constructor(public activeModal: NgbActiveModal) {}
}