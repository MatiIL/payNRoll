import { Component, OnInit } from '@angular/core';
import { AllTeamsService } from 'src/app/services/all-teams.service';
import { EditTeamModalComponent } from '../edit-team/edit-team-modal/edit-team-modal.component';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];
  
  constructor(
    private allTeamsService: AllTeamsService,
    private modal: NgbModal,
    ) {}

  ngOnInit(): void {
    this.allTeamsService.getAllTeams().subscribe({
      next: (data) => {
        this.allTeamsService.saveToLocalStorage('allTeamsData', data);
      }
    });
    const allTeamsDataString = localStorage.getItem('allTeamsData');
    if (allTeamsDataString) {
      this.teams = JSON.parse(allTeamsDataString);
    }
  };

  modalOptions: NgbModalOptions = {
    fullscreen: true
};

editTeam(teamName: string) {
  console.log(teamName)
  const clickedTeam = this.teams.find((team) => team.name === teamName); 
  const modalRef = this.modal.open(EditTeamModalComponent, this.modalOptions);
  modalRef.componentInstance.team = clickedTeam; 
}

}