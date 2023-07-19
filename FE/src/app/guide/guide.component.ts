import { Component, ElementRef, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuideModalComponent } from '../guide-modal/guide-modal.component';

@Component({
  selector: 'app-guide',
  standalone: true,
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class GuideComponent {

  

  constructor(private modalService: NgbModal) {}

  clickedSection:string = '';

	open(e:any) {
    this.clickedSection = e.target.childNodes[0].data;
		const modalRef = this.modalService.open(GuideModalComponent);
		modalRef.componentInstance.title = this.clickedSection;
	}

}
