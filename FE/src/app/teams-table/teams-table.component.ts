import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Player } from '../schemas/player';
import { processRookieDraftPick, calcAuctionBudget } from '../utils';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTooltipModule],
})
export class TeamsTableComponent implements OnInit {
  dataSource: Player[] = [];
  displayedColumns: string[] = ['player', 'nextSeasonSalary'];
  selectedIndex: number = 0;

  ngOnInit(): void {
    const myTeamData = localStorage.getItem('myTeamData');
    if (myTeamData) {
      const teamDataArray = JSON.parse(myTeamData);
      const rookiePickStatus = teamDataArray.rookiesDraftDetails;
      delete rookiePickStatus.__typename;
      const rookieDraftValue = processRookieDraftPick(rookiePickStatus);
      const currentRoster = teamDataArray.currentRoster;
      currentRoster.map((player: Player) => {
        if (player.keeperStatus === 1) {
          player.nextSeasonSalary = player.purchasePrice;
        }
      });
      let owedSalaries: number[] = [];
      teamDataArray.currentRoster.filter(
        (player: Player) => {
          if (player.nextSeasonSalary) {
            owedSalaries.push(player.nextSeasonSalary)
          }  
        }
      );
      const auctionBudget = calcAuctionBudget(teamDataArray.nextYearBudget, owedSalaries);
      this.dataSource = [
        ...currentRoster,
        {
          player: 'תקציב לדראפט אוקשן',
          nextSeasonSalary: auctionBudget,
        },
        {
          player: 'סטטוס בחירה בדראפט רוקיז',
          nextSeasonSalary:
            rookieDraftValue !== '' ? rookieDraftValue : 'מחזיק בבחירה של עצמך',
        },
      ];
    } else {
      console.log('No data stored in local storage');
    }
  }
}
