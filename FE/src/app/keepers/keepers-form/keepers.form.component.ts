import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../schemas/player';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule, MatSelectChange } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import {
  processRookieDraftPick,
  veteransMarketStatus,
  calcAuctionBudget,
} from '../../utils';

interface PotentialKeeper {
  value: Player;
  viewValue: string;
  nextSeasonSalary?: number;
}

@Component({
  selector: 'app-keepers-form',
  templateUrl: './keepers-form.component.html',
  styleUrls: ['./keepers-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
  ],
})
export class KeepersFormComponent implements OnInit {
  openKeeperSlots: number = 4;
  teamName: string = '';
  owedSalaries: number[] = [];
  auctionBudget: number = 0;
  rookiesDraft: string = '';
  veteransMarket: string = '';
  keepersList: Player[] = [];
  maxPlayersList: PotentialKeeper[] = [];
  secondMaxPlayersList: PotentialKeeper[] = [];
  maxpiringPlayerOptions: PotentialKeeper[] = [];
  potentialSolids: string[] = [];
  selectedSolids = new FormControl('');
  potentialPriceyVets: string[] = [];
  selectedPriceyVet = new FormControl('');
  potentialCheapVets: PotentialKeeper[] = [];
  selectedCheapVets = new FormControl('');
  potentialUndraftedRookies: PotentialKeeper[] = [];
  selectedUndraftedRookies = new FormControl('');
  signedMaxPlayer: boolean = false;
  signedSecondMax: boolean = false;
  signedMaxpiring: boolean = false;
  isSecondMaxAllowed: boolean = true;
  signedSolidDiffFrom29: number = 0;
  canSplitSolid: boolean = true;
  disableSelect = new FormControl(false);

  filterPotentialKeepers(roster: Player[]) {
    roster.map((player: Player) => {
      if (player.keeperStatus === 1) {
        this.keepersList.push(player);
        player.nextSeasonSalary = player.purchasePrice;
        this.openKeeperSlots -= 1;
        if (player.purchasePrice >= 40) {
          this.maxPlayersList = this.maxPlayersList.filter(
            (player) => player.value.keeperStatus !== 1
          );
          this.maxPlayersList.map((player) => {
            const editedPlayer = player;
            editedPlayer.nextSeasonSalary =
              editedPlayer.value.purchasePrice + 5;
            editedPlayer.viewValue = `${editedPlayer.value.player} (${editedPlayer.nextSeasonSalary}$ לעונה אחת)`;
            this.secondMaxPlayersList.push(editedPlayer);
          });
          this.signedMaxPlayer = true;
        }
        if (player.purchasePrice >= 30 && player.purchasePrice <= 39) {
          this.signedMaxpiring = true;
        }
        if (player.purchasePrice >= 20 && player.purchasePrice <= 29) {
          this.canSplitSolid = false;
        }
        if (player.purchasePrice <= 20 && player.purchasePrice >= 10) {
          this.signedSolidDiffFrom29 = 29 - player.purchasePrice;
        }
      } else {
        switch (true) {
          case player.purchasePrice >= 40 && !this.signedMaxPlayer:
            this.maxPlayersList.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$ לשתי העונות הקרובות)`,
            });
            break;
          case player.purchasePrice >= 40 && this.signedMaxPlayer:
            this.secondMaxPlayersList.push({
              value: player,
              viewValue: `${player.player} (${
                player.purchasePrice + 5
              }$ לעונה אחת)`,
            });
            break;
          case player.purchasePrice >= 30 &&
            player.purchasePrice <= 39 &&
            !this.signedMaxpiring:
            this.maxpiringPlayerOptions.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$ לעונה אחת בלבד)`,
            });
            break;
          case player.purchasePrice >= 10 &&
            player.purchasePrice <= 29 &&
            player.purchasePrice <= this.signedSolidDiffFrom29:
            this.potentialSolids.push(
              `${player.player} (${player.purchasePrice}$)`
            );
            break;
          case player.purchasePrice >= 10 &&
            player.purchasePrice <= 29 &&
            player.YOS >= 10:
            this.potentialPriceyVets.push(
              `${player.player} (${player.purchasePrice}$)`
            );
            break;
          case player.purchasePrice <= 9 && player.YOS >= 10:
            this.potentialCheapVets.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$ לעונה אחת בלבד)`,
            });
            break;
          case player.purchasePrice <= 5 && player.YOS === 1:
            this.potentialUndraftedRookies.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$ לשתי העונות הבאות)`,
            });
            break;
        }
      }
    });
  }

  ngOnInit(): void {
    const myTeamData = localStorage.getItem('myTeamData');
    if (myTeamData) {
      const teamDataArray = JSON.parse(myTeamData);
      this.filterPotentialKeepers(teamDataArray.currentRoster);
      this.teamName = teamDataArray.name;
      teamDataArray.currentRoster.filter((player: Player) => {
        if (player.nextSeasonSalary) {
          this.owedSalaries.push(player.nextSeasonSalary);
        }
      });
      this.auctionBudget = calcAuctionBudget(
        teamDataArray.nextYearBudget,
        this.owedSalaries
      );
      this.veteransMarket = veteransMarketStatus(teamDataArray.finalRank);
      const rookiePickStatus = teamDataArray.rookiesDraftDetails;
      delete rookiePickStatus.__typename;
      this.rookiesDraft = processRookieDraftPick(rookiePickStatus);
    }
  }

  onCheck(event: MatCheckboxChange): void {
    event.checked ? (this.openKeeperSlots += 1) : (this.openKeeperSlots -= 1);
  }

  onFirstMaxSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      return;
    } else {
      const selectedPlayer = event.value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      this.keepersList.push(selectedPlayer);
      this.maxPlayersList = this.maxPlayersList.filter(
        (player) => player.value.keeperStatus !== 1
      );
      this.maxPlayersList.map((player) => {
        const editedPlayer = player;
        editedPlayer.nextSeasonSalary = editedPlayer.value.purchasePrice + 5;
        editedPlayer.viewValue = `${editedPlayer.value.player} (${editedPlayer.nextSeasonSalary}$ לעונה אחת)`;
        this.secondMaxPlayersList.push(editedPlayer);
      });
      this.signedMaxPlayer = true;
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onSecondMaxSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      return;
    } else {
      this.signedSecondMax = true;
      const selectedPlayer = event.value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice + 5;
      this.keepersList.push(selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onMaxpiringSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      return;
    } else {
      const selectedPlayer = event.value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      this.keepersList.push(selectedPlayer);
      this.maxpiringPlayerOptions.filter((player) => player !== selectedPlayer);
      this.openKeeperSlots -= 1;
      this.signedMaxpiring = true;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onCheapVeteranSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      return;
    } else {
      const selectedPlayer = event.value[0].value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      this.keepersList.push(selectedPlayer);
      this.potentialCheapVets.filter((player) => player !== selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onUndraftedRookieSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      return;
    } else {
      const selectedPlayer = event.value[0].value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      this.keepersList.push(selectedPlayer);
      this.potentialCheapVets.filter((player) => player !== selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onSelectionChange(event: MatSelectChange): void {}
}
