import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamFormComponent } from '../add-team-form/team-form.component';
import { TeamModalService } from 'src/app/services/team-modal.service';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
  standalone: true,
  imports: [TeamFormComponent, CommonModule],
})

export class TeamModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    public teamModalService: TeamModalService,
    ) {}

    get payrollList() {
      return this.teamModalService.payrollList;
    }

}