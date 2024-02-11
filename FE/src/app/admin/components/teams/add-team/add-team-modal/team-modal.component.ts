import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TeamFormComponent } from '../add-team-form/team-form.component';
import { TeamModalService } from 'src/app/services/team-modal.service';

@Component({
  selector: 'app-team-modal',
  templateUrl: './team-modal.component.html',
  styleUrls: ['./team-modal.component.scss'],
  standalone: true,
  imports: [TeamFormComponent],
})
export class TeamModalComponent {

  constructor(
    public activeModal: NgbActiveModal,
    public teamModalService: TeamModalService,
    ) {}

    ngOnInit(): void {
      console.log('Received userId:', this.teamModalService.userId);
      console.log('Received teamName:', this.teamModalService.teamName);
    }

}