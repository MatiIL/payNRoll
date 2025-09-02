import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lotteryCalculator } from 'src/app/utils';
import { map, timer, takeWhile, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-lottery-modal',
  templateUrl: './lottery-modal.component.html',
  styleUrls: ['./lottery-modal.component.scss'],
  animations: [
    trigger('fadeInTeam', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('2000ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
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
  resultsTimerSeconds = 10;
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
        map((n) => this.resultsTimerSeconds - n),
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

  // handlePickSwap(picks: any[]): void {
  //   let teamThatOwes: any;
  //   let teamThatOwns: any;
  //   const lotteryDetails = localStorage.getItem('lotteryDetails');
  //   if (lotteryDetails) {
  //     const lotteryDataCopy = JSON.parse(lotteryDetails);
  //     lotteryDataCopy.map((team: any) => {
  //       if (
  //         team.rookiesDraftDetails.swapRightsWith !== undefined &&
  //         team.rookiesDraftDetails.swapRightsWith.includes('Owe')
  //       ) {
  //         teamThatOwes = team;
  //       }
  //       if (
  //         team.rookiesDraftDetails.swapRightsWith !== undefined &&
  //         team.rookiesDraftDetails.swapRightsWith.includes('Own')
  //       ) {
  //         teamThatOwns = team;
  //       }
  //     });

  //     const owesIndex = picks.findIndex(
  //       (item) => item.name === teamThatOwes.name
  //     );
  //     console.log(owesIndex)
  //     const ownsIndex = picks.findIndex(
  //       (item) => item.name === teamThatOwns.name
  //     );
  //     console.log(ownsIndex)

  //     if (teamThatOwes && teamThatOwns && ownsIndex > owesIndex) {
  //       picks.find((item) => {
  //         if (item.name === teamThatOwes.name) {
  //           item.name = `${item.name} ---> ${teamThatOwns.name}`;
  //         }
  //         if (item.name === teamThatOwns.name) {
  //           item.name = `${item.name} ---> ${teamThatOwes.name}`;
  //         }
  //       });
  //     }
  //     console.log(`team that owes a pick is ${teamThatOwes}, team that owns a pick is ${teamThatOwns}`)
  //   }
  // }

handlePickSwap(picks: any[]): void {
  let teamThatOwes: any;
  let teamThatOwns: any;
  const lotteryDetails = localStorage.getItem('lotteryDetails');
  
  if (lotteryDetails) {
    const lotteryDataCopy = JSON.parse(lotteryDetails);
    
    const getBaseTeamName = (name: string): string => {
      return name.includes(' --->') ? name.split(' --->')[0].trim() : name;
    };
    
    // Find teams with swap rights
    lotteryDataCopy.forEach((team: any) => {
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

    if (!teamThatOwes || !teamThatOwns) {
      console.log('No swap rights found');
      return;
    }

    // Check if teams are in the lottery picks
    const owesIndex = picks.findIndex(
      (item) => getBaseTeamName(item.name) === teamThatOwes.name
    );
    
    const ownsIndex = picks.findIndex(
      (item) => getBaseTeamName(item.name) === teamThatOwns.name
    );

    // In inverse draft order: LOWER finalRank = WORSE draft position
    // Swap occurs when team that owns would have a worse draft position
    
    // CASE 1: Only team that owes is in lottery
    if (owesIndex !== -1 && ownsIndex === -1) {
      // Team that owns finished top 3, gets the lottery pick
      picks.forEach((item) => {
        const baseItemName = getBaseTeamName(item.name);
        if (baseItemName === teamThatOwes.name) {
          item.name = `${teamThatOwes.name} ---> ${teamThatOwns.name}`;
        }
      });
      console.log(`Swap: ${teamThatOwes.name} lottery pick goes to ${teamThatOwns.name}`);
    }
    
    // CASE 2: Both teams are in the lottery
    else if (owesIndex !== -1 && ownsIndex !== -1) {
      // Swap if team that owns has worse lottery position (higher index)
      if (ownsIndex > owesIndex) {
        picks.forEach((item) => {
          const baseItemName = getBaseTeamName(item.name);
          
          if (baseItemName === teamThatOwes.name) {
            item.name = `${teamThatOwes.name} ---> ${teamThatOwns.name}`;
          }
          if (baseItemName === teamThatOwns.name) {
            item.name = `${teamThatOwns.name} ---> ${teamThatOwes.name}`;
          }
        });
        console.log(`Swap: Both in lottery, swapping picks between ${teamThatOwes.name} and ${teamThatOwns.name}`);
      } else {
        console.log(`No swap: ${teamThatOwns.name} already has same or better lottery pick`);
      }
    }
    
        // CASE 3: Only team that owns is in lottery
    else if (owesIndex === -1 && ownsIndex !== -1) {
      // Team that owns is in lottery, team that owes finished top 3
      // No swap - team that owns already has a better pick (lottery picks are better than picks 9-11)
      console.log(`No swap: ${teamThatOwns.name} is in lottery, already has better pick than ${teamThatOwes.name} who finished ${teamThatOwes.finalRank}`);
    }
    
    // CASE 4: Neither team is in lottery (both finished 1-3)
    else if (owesIndex === -1 && ownsIndex === -1) {
      // In inverse draft: lower finalRank (better finish) = worse draft pick
      // kubista (rank 1) gets pick 11, R U MINE? (rank 3) gets pick 9
      // Since kubista owns rights and would pick worse (11 vs 9), swap occurs
      if (teamThatOwns.finalRank < teamThatOwes.finalRank) {
         this.lotteryData.forEach((item) => {
          const baseItemName = getBaseTeamName(item.name);
          
          if (baseItemName === teamThatOwes.name) {
            item.name = `${teamThatOwes.name} ---> ${teamThatOwns.name}`;
          }
          if (baseItemName === teamThatOwns.name) {
            item.name = `${teamThatOwns.name} ---> ${teamThatOwes.name}`;
          }
        });
      } else {
        console.log(`No future swap: ${teamThatOwns.name} (rank ${teamThatOwns.finalRank}) already has same or better draft position than ${teamThatOwes.name} (rank ${teamThatOwes.finalRank})`);
      }
    }
  }
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}