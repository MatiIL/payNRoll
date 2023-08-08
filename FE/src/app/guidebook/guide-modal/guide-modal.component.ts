import { Component, Input, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GuideAccordionComponent } from '../guide-accordion/guide-accordion.component';

@Component({
  imports: [GuideAccordionComponent],
  schemas: [NO_ERRORS_SCHEMA],
  selector: 'app-guide-modal',
  standalone: true,
	templateUrl: './guide-modal.component.html',
  styleUrls: ['./guide-modal.component.scss']
})

export class GuideModalComponent implements OnInit {
	@Input() title: string = '';
  @Input() content: { subTitle: string, subText: string }[] = [];

	constructor(public activeModal: NgbActiveModal) {}
  ngOnInit(): void {}
}