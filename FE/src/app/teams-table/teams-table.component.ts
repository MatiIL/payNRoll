import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Player } from '../schemas/player';
import { SelectPayrollService } from '../services/select-payroll-service';
import { processRookieDraftPick } from '../utils';
import { BudgetTransfer } from '../schemas/budgetTransfer';

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
  dataSource: any[] = [];
  displayedColumns: string[] = ['currentSalary', 'nextSeasonSalary', 'inTwoYears'];
  selectedIndex: number = 0;
  currentYear: number = new Date().getFullYear();
  draftPickStatus: string = '';
  budgetTransfers: BudgetTransfer[] = [];
  isPriceyVeteran: boolean = false;
  private componentDestroyed = new Subject<void>();

  constructor(private selectPayrollService: SelectPayrollService) {}

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
      this.draftPickStatus = rookieDraftValue !== '' ? rookieDraftValue : 'מחזיק בבחירה'

      const currentRoster = teamDataArray.currentRoster;
      const currentSeasonPlayers = currentRoster;
      const nextSeasonSalary = [...currentRoster].filter(
        (player: any) => player.contractLength >= '2'
      ).sort((a: any, b: any) => b.nextSeasonSalary - a.nextSeasonSalary);
      const inTwoYears = [...currentRoster].filter(
        (player: any) => player.contractLength >= '3'
      ).sort((a: any, b: any) => b.salary - a.salary);

      this.dataSource = [
        {
          currentSalary: currentSeasonPlayers,
          nextSeasonSalary: nextSeasonSalary,
          salaryInTwoYears: inTwoYears,
        },
      ];

      currentRoster.map((player: Player) => {
        if (player.keeperStatus === 1) {
          player.nextSeasonSalary = player.purchasePrice;
        }
      });
      teamDataArray.currentRoster.sort(
        (a: Player, b: Player) =>
          (b.nextSeasonSalary || 0) - (a.nextSeasonSalary || 0)
      );
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
