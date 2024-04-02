import { Component, OnInit } from '@angular/core';
import { AllTeamsService } from 'src/app/services/all-teams.service';
import { convertRankToOdds } from 'src/app/utils';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { LotteryModalComponent } from '../lottery-modal/lottery-modal/lottery-modal.component';
import { lotteryCalculator } from 'src/app/utils';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss'],
})
export class LotteryComponent implements OnInit {
  teamsLotteryDetails: any[] = [];

  constructor(
    private allTeamsService: AllTeamsService,
    private modal: NgbModal
  ) {}

  ngOnInit(): void {
    this.allTeamsService.getAllTeams().subscribe({
      next: (data) => {
        this.teamsLotteryDetails = data.map((team: any) => ({
          name: team.name,
          finalRank: team.finalRank,
          lotteryOdds: convertRankToOdds(team.finalRank),
          rookiesDraftDetails: {
            incomingPick: team.rookiesDraftDetails.incomingPick,
            outgoingPick: team.rookiesDraftDetails.outgoingPick,
            swapRightsWith: team.rookiesDraftDetails.swapRightsWith,
          },
        }));
        this.teamsLotteryDetails.sort((a, b) => a.finalRank - b.finalRank);
        this.allTeamsService.saveToLocalStorage(
          'lotteryDetails',
          this.teamsLotteryDetails
        );
      },
    });
  }

  modalOptions: NgbModalOptions = {
    animation: true,
    size: 'xl',
  };

  openLotteryModal() {
    const modalRef = this.modal.open(LotteryModalComponent, this.modalOptions);
    const lotteryTeams: any[] = [];
    this.teamsLotteryDetails.map((team) => {
      if (team.lotteryOdds !== 0) {
        delete team.finalRank;
        team.drawn = false;
        lotteryTeams.push(team);
      }
    })
    modalRef.componentInstance.teamsLotteryDetails = lotteryTeams;
  }

  testLotteryCalc() {
    const pickWins: { [teamName: string]: number[] } = {};

    // Initialize pickWins object
    this.teamsLotteryDetails.forEach((team) => {
      pickWins[team.name] = [0, 0, 0];
    });

    for (let i = 0; i <= 1000; i++) {
      const lotteryDataCopy = [...this.teamsLotteryDetails];
      const lotteryTeams = lotteryDataCopy.splice(3, 8);
      const namesWithOdds = lotteryTeams.map((team: any) => ({
        name: team.name,
        odds: team.lotteryOdds,
      }));
      const lotteryResults = lotteryCalculator(namesWithOdds);

      lotteryResults.forEach((result) => {
        if (result.finalRank <= 3) {
          pickWins[result.name][result.finalRank - 1]++; // Increment the corresponding pick win count
        }
      });
    }

    // Calculate and log pick win probabilities
    this.teamsLotteryDetails.forEach((team) => {
      const [firstPickWins, secondPickWins, thirdPickWins] =
        pickWins[team.name];
      const firstPickProbability = 100 * (firstPickWins / 1000);
      const secondPickProbability = 100 * (secondPickWins / 1000);
      const thirdPickProbability = 100 * (thirdPickWins / 1000);
      console.log(`${team.name}: 
       ${firstPickWins} first picks wins with probability of ${firstPickProbability}.
       ${secondPickWins} first picks wins with probability of ${secondPickProbability}.
       ${thirdPickWins} first picks wins with probability of ${thirdPickProbability}.
       `);
    });
  }
}