import { Component, OnInit } from '@angular/core';
import { AllTeamsService } from 'src/app/services/all-teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  teams: any[] = [];

  constructor(private allTeamsService: AllTeamsService) {}

  ngOnInit(): void {
    this.allTeamsService.getAllTeams().subscribe({
      next: (data) => {
        this.allTeamsService.saveToLocalStorage('allTeamsData', data);
      }
    });
    const allTeamsDataString = localStorage.getItem('allTeamsData');
    if (allTeamsDataString) {
      this.teams = JSON.parse(allTeamsDataString);
      console.log(this.teams)
    }
  }

}
