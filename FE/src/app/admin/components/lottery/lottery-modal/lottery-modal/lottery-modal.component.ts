import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { lotteryCalculator } from 'src/app/utils';
import { CountdownModule } from 'ngx-countdown';

@Component({
  selector: 'app-lottery-modal',
  templateUrl: './lottery-modal.component.html',
  styleUrls: ['./lottery-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, CountdownModule],
})
export class LotteryModalComponent implements OnInit {
  lotteryData: any[] = [];
  postLotteryOrder: any[] = [];
  finalDraftOrder: any[] = [];
  draftPicks: string[] = [];
  intervalDuration = 20000;
  currentIndex = 7;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    const lotteryDetails = localStorage.getItem('lotteryDetails');
    if (lotteryDetails) {
      this.lotteryData = JSON.parse(lotteryDetails);
      for (let i = 0; i < 3; i++) {
        if (this.lotteryData[i].rookiesDraftDetails.outgoingPick !== '') {
          this.lotteryData[i].name = `${this.lotteryData[i].name} -->
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
      this.renderPicksWithDelay();
      this.handlePickSwap(this.finalDraftOrder);
    }
  }

  renderPicksWithDelay(): void {
    const intervalId = setInterval(() => {
      if (this.currentIndex < 0) {
        clearInterval(intervalId); // Stop the interval when all picks are rendered
      } else {
        const pickIndex = this.currentIndex + 1; // Calculate the pick index (1-based)
        const teamName = this.finalDraftOrder[this.currentIndex].name; // Get the team name
        const formattedPick = `${pickIndex}. ${teamName}`; // Format the pick with index and team name
        this.draftPicks.push(formattedPick); // Push the formatted pick into the array
        this.currentIndex--; // Move to the previous pick
      }
    }, this.intervalDuration);
  }

  handlePickSwap(picks: any[]): void {
    console.log(picks);

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
        console.log(teamThatOwes.name, teamThatOwns.name);
        picks.find((item) => {
          console.log(item);
          if (item.name === teamThatOwes.name) {
            item.name = `${item.name} --> ${teamThatOwns.name}`;
          }
          if (item.name === teamThatOwns.name) {
            item.name = `${item.name} --> ${teamThatOwes.name}`;
          }
        });

        // if (!teamThatOwes.name.includes'-->') && !teamThatOwns.name.includes('-->')) {

        // if (picks[owesIndex]?.finalRank > picks[ownsIndex]?.finalRank) {
        //   const temp = picks[owesIndex];
        //   picks[owesIndex] = picks[ownsIndex];
        //   picks[ownsIndex] = temp;
        // }
      }
    }
  }
}
