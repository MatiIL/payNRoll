import { Component, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GuideModalComponent } from '../guide-modal/guide-modal.component';
import { guideBookArray } from '../guide-data';

@Component({
  selector: 'app-guide-page',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './guide-page.component.html',
  styleUrls: ['./guide-page.component.scss']
})
export class GuideComponent {
  constructor(private modalService: NgbModal) {}

  clickedSection: string = '';
  sectionContent: any;

	open(e: any) {
    this.clickedSection = e.target.childNodes[0].data;
    const sectionInitials = this.clickedSection.slice(3, 6).trim();

    guideBookArray.forEach((item) => {
      if (item.titleInitials === sectionInitials) {
        this.sectionContent = item.subSections;
      }
    });

		const modalRef = this.modalService.open(GuideModalComponent, { size: 'l', scrollable: true });
		modalRef.componentInstance.title = this.clickedSection;
    modalRef.componentInstance.content = this.sectionContent;
	}
}
