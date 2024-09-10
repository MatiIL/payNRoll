import { Component, OnInit } from '@angular/core';
import { Team } from '../schemas/team';
import { Player } from '../schemas/player';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';

interface FunTeamData {
  teamName: string;
  auctionBudget: number;
  avgYOS: number;
}

@Component({
  selector: 'app-fun-data',
  templateUrl: './fun-data.component.html',
  styleUrls: ['./fun-data.component.scss'],
})
export class FunDataComponent implements OnInit {
  allTeamsData: Team[] = [];
  allKeepers: Player[] = [];
  teamsFunData: FunTeamData[] = [];
  funDataSortedBudget: FunTeamData[] = [];
  accumulatedBudget: number = 0;
  funDataSortedYOS: FunTeamData[] = [];
  upcomingSellswords: String[] = [];
  upcomingFreeAgents: String[] = [];

  ngOnInit(): void {
    const allTeamsDataString = localStorage.getItem('allTeamsData');
    if (allTeamsDataString) {
      this.allTeamsData = JSON.parse(allTeamsDataString);

      this.allKeepers = [
        ...this.allTeamsData.flatMap(team => 
          team.currentRoster.filter(player => player.keeperStatus === 1)
        ).sort((a, b) => (b.nextSeasonSalary || 0) - (a.nextSeasonSalary || 0))
      ];

      let totalBudgets = 0;
      this.teamsFunData = [...this.allTeamsData].map((team) => {
        const auctionBudget =
          team.nextYearBudget -
          team.currentRoster.reduce(
            (total, player: Player) => total + player.purchasePrice,
            0
          );

        totalBudgets += auctionBudget; 

        return {
          teamName: team.name,
          auctionBudget: auctionBudget,
          avgYOS: parseFloat(
            (
              team.currentRoster.reduce(
                (total, player: Player) => total + player.YOS - 1,
                0
              ) / team.currentRoster.length
            ).toFixed(1)
          ),
        };
      });

      this.accumulatedBudget = totalBudgets; 

      this.funDataSortedBudget = [...this.teamsFunData].sort(
        (a, b) => b.auctionBudget - a.auctionBudget
      );
      this.funDataSortedYOS = [...this.teamsFunData].sort(
        (a, b) => b.avgYOS - a.avgYOS
      );

      this.upcomingSellswords.push(
        "Kevin Durant", "Devin Booker", "Demar Derozan", "Zach LaVine","Bradley Beal", 
        "Khris Middleton", "Brook Lopez", "CJ McCollum", "Jonas Valanciunas", 
        "Aaron Gordon", "Chris Paul"
      );

      // Create an array of players that meet the criteria, including their nextSeasonSalary
      const filteredAndSortedPlayers = this.allTeamsData
        .flatMap((team) =>
          team.currentRoster
            .filter((player) => player.contractLength === 1 && player.YOS !== 1)
            .map((player) => ({
              player: player.player,
              nextSeasonSalary: player.nextSeasonSalary ?? 0, // Default to 0 if nextSeasonSalary is null or undefined
            }))
        )
        .sort((a, b) => (b.nextSeasonSalary || 0) - (a.nextSeasonSalary || 0)); // Sort by nextSeasonSalary descending

      // Extract just the player names from the sorted array
      this.upcomingFreeAgents = filteredAndSortedPlayers
    .map((player) => player.player)
    .filter(playerName => !this.upcomingSellswords.includes(playerName));
    }
  }

}
