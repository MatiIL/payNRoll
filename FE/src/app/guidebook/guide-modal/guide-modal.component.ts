// import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GuideAccordionComponent } from '../guide-accordion/guide-accordion.component';

@Component({
  imports: [GuideAccordionComponent],
  selector: 'app-guide-modal',
  standalone: true,
	templateUrl: './guide-modal.component.html',
  styleUrls: ['./guide-modal.component.scss']
})

export class GuideModalComponent implements OnInit {

  subSections = [];

	@Input() title: any;
  @Input() content: any;

	constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    
  }
  
}