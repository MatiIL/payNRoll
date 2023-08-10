import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthModalComponent } from '../auth/auth-modal/auth-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
	imports: [NgbCollapseModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  constructor(private modalService: NgbModal) {}
  open(e: any) {
    this.modalService.open(AuthModalComponent, { size: 'l' });
  }

  isMenuCollapsed = true;
}
