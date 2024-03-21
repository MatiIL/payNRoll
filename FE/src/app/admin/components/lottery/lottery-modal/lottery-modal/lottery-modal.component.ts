import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lotteryCalculator } from 'src/app/utils';
import { map, timer, takeWhile, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-lottery-modal',
  templateUrl: './lottery-modal.component.html',
  styleUrls: ['./lottery-modal.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LotteryModalComponent implements OnInit {
  teamsLotteryDetails: any[] = [];
  lotteryData: any[] = [];
  postLotteryOrder: any[] = [];
  finalDraftOrder: any[] = [];
  draftPicks: string[] = [];
  intervalDuration = 10000;
  currentIndex = 7;
  lotteryCountdown: string = '';
  didLotteryBegin: boolean = true;
  resultsInterval: string = '';
  seconds = 10;
  private destroy$ = new Subject<void>();
  didLotteryEnd: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const lotteryDetails = localStorage.getItem('lotteryDetails');
    if (lotteryDetails) {
      this.lotteryData = JSON.parse(lotteryDetails);
      for (let i = 0; i < 3; i++) {
        if (this.lotteryData[i].rookiesDraftDetails.outgoingPick !== '') {
          this.lotteryData[i].name = `${this.lotteryData[i].name} --->
          ${this.lotteryData[i].rookiesDraftDetails.outgoingPick}
          `;
        }
      }

      const lotteryDataCopy = this.lotteryData;
      const lotteryTeams = lotteryDataCopy.splice(3, 8);
      const namesWithOdds = lotteryTeams.map((team: any) => ({
        name: team.name,
        odds: team.lotteryOdds,
      }));
      const lotteryResults = lotteryCalculator(namesWithOdds);
      this.finalDraftOrder.push(...lotteryResults);
      const winningTeamNames = lotteryResults.map((result) => result.name);
      const filteredLotteryTeams = lotteryTeams.filter(
        (team: any) => !winningTeamNames.includes(team.name)
      );
      filteredLotteryTeams.sort((a: any, b: any) => b.finalRank - a.finalRank);
      this.finalDraftOrder.push(...filteredLotteryTeams);
      this.startTimer();
      this.renderPicksWithDelay();
      this.handlePickSwap(this.finalDraftOrder);
    }
  }

  startTimer() {
    timer(0, 1000)
      .pipe(
        map((n) => this.seconds - n),
        takeUntil(this.destroy$)
      )
      .subscribe((timeInSeconds) => {
        if (timeInSeconds >= 0) {
          this.lotteryCountdown = this.formatTimeRemaining(timeInSeconds);
          this.cdr.detectChanges(); // Trigger change detection
        } else {
          this.lotteryCountdown = '0:00'; // Set time remaining to 0:00 when countdown completes
        }
      });
  }

  formatTimeRemaining(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  renderPicksWithDelay(): void {
    const intervalId = setInterval(() => {
        const pickIndex = this.currentIndex + 1;
        if (pickIndex === 8) this.didLotteryBegin = false;
        const teamName = this.finalDraftOrder[this.currentIndex].name; 
        const formattedPick = `${pickIndex}. ${teamName}`; 
        this.draftPicks.push(formattedPick); 
        this.markTeamAsDrawn(teamName);
        this.currentIndex--;
        if (pickIndex > 2) {
          this.lotteryResultsTimer();
        } else {
          clearInterval(intervalId);
          this.didLotteryEnd = true;
          setTimeout(() => {
            const pickIndex = this.currentIndex + 1;
            const teamName = this.finalDraftOrder[this.currentIndex].name; 
            const formattedPick = `${pickIndex}. ${teamName}`; 
            this.draftPicks.push(formattedPick); 
            this.markTeamAsDrawn(teamName);
            this.currentIndex--;
          }, 1000);
      }
    }, this.intervalDuration);
  }

  markTeamAsDrawn(teamName: string) {
    const cleanedTeamName = teamName.includes(' --->') ? teamName.split(' --->')[0] : teamName;
    const team = this.teamsLotteryDetails.find(t => t.name === cleanedTeamName);
    if (team) {
      team.drawn = true;
    }
  }
  
  lotteryResultsTimer(): void {
    timer(0, 1000)
      .pipe(
        map((n) => this.seconds - n),
        takeWhile((timeInSeconds) => timeInSeconds >= 0) // Stop emitting values when countdown reaches zero
      )
      .subscribe((timeInSeconds) => {
        if (timeInSeconds >= 0) {
          this.resultsInterval = this.formatTimeRemaining(timeInSeconds);
        } else {
          this.resultsInterval = '0:00'; 
        }
      });
  }

  handlePickSwap(picks: any[]): void {
    let teamThatOwes: any;
    let teamThatOwns: any;
    const lotteryDetails = localStorage.getItem('lotteryDetails');
    if (lotteryDetails) {
      const lotteryDataCopy = JSON.parse(lotteryDetails);
      lotteryDataCopy.map((team: any) => {
        if (
          team.rookiesDraftDetails.swapRightsWith !== undefined &&
          team.rookiesDraftDetails.swapRightsWith.includes('Owe')
        ) {
          teamThatOwes = team;
        }
        if (
          team.rookiesDraftDetails.swapRightsWith !== undefined &&
          team.rookiesDraftDetails.swapRightsWith.includes('Own')
        ) {
          teamThatOwns = team;
        }
      });

      const owesIndex = picks.findIndex(
        (item) => item.name === teamThatOwes.name
      );
      const ownsIndex = picks.findIndex(
        (item) => item.name === teamThatOwns.name
      );

      if (teamThatOwes && teamThatOwns && ownsIndex > owesIndex) {
        picks.find((item) => {
          if (item.name === teamThatOwes.name) {
            item.name = `${item.name} ---> ${teamThatOwns.name}`;
          }
          if (item.name === teamThatOwns.name) {
            item.name = `${item.name} ---> ${teamThatOwes.name}`;
          }
        });
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}