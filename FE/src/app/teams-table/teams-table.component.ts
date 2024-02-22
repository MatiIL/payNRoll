import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Player } from '../schemas/player';
import { SelectPayrollService } from '../services/select-payroll-service';
import { processRookieDraftPick, calcAuctionBudget } from '../utils';

@Component({
  selector: 'app-teams-table',
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTooltipModule],
})
export class TeamsTableComponent implements OnInit {
  teamName: string | undefined = '';
  selectedPayroll: string = '';
  allTeamsData: any[] = [];
  dataSource: Player[] = [];
  displayedColumns: string[] = ['player', 'nextSeasonSalary'];
  selectedIndex: number = 0;
  private componentDestroyed = new Subject<void>();

  constructor( private selectPayrollService: SelectPayrollService) {}

  ngOnInit(): void {
    this.selectPayrollService.selectedValue$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((value) => {
        this.selectedPayroll = value;
        this.updateData();
      });
  }

  private updateData(): void {
    const allTeamsDataString = localStorage.getItem('allTeamsData');
    if (allTeamsDataString) {
      this.allTeamsData = JSON.parse(allTeamsDataString);
      const teamDataArray = this.allTeamsData.find(
        (team) => team.name === this.selectedPayroll
      );
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
      teamDataArray.currentRoster.filter((player: Player) => {
        if (player.nextSeasonSalary) {
          owedSalaries.push(player.nextSeasonSalary);
        }
      });
      const auctionBudget = calcAuctionBudget(
        teamDataArray.nextYearBudget,
        teamDataArray.finalRank,
        owedSalaries
      );
      this.dataSource = [
        ...currentRoster,
        {
          player: 'תקציב (משוער) לדראפט אוקשן',
          nextSeasonSalary: auctionBudget,
        },
        {
          player: 'סטטוס בחירה בדראפט רוקיז',
          nextSeasonSalary:
            rookieDraftValue !== '' ? rookieDraftValue : 'מחזיק בבחירה',
        },
      ];
    } else {
      console.log('No data stored in local storage');
    }
  }

  ngOnDestroy(): void {
    this.selectPayrollService.setSelectedValue('');
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }
}
