import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Player } from '../../schemas/player';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule, MatSelectChange, MatSelect } from '@angular/material/select';
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
  contractLength?: number;
}

@Component({
  selector: 'app-keepers-form',
  templateUrl: './keepers-form.component.html',
  styleUrls: ['./keepers-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
  ],
})

export class KeepersFormComponent implements OnInit {
  @ViewChild('selectRef') selectRef!: MatSelect;
  openKeeperSlots: number = 4;
  teamName: string = '';
  owedSalaries: number[] = [];
  auctionBudget: number = 0;
  rookiesDraft: string = '';
  veteransMarket: string = '';
  noVetMarketChecked: boolean = false;
  keepersList: Player[] = [];
  maxPlayersList: PotentialKeeper[] = [];
  secondMaxPlayersList: PotentialKeeper[] = [];
  maxpiringPlayerOptions: PotentialKeeper[] = [];
  defaultSolidType: string = '0';
  potentialSolids: PotentialKeeper[] = [];
  splitSolidOptions: PotentialKeeper[] = [];
  potentialPriceyVets: PotentialKeeper[] = [];
  showFullSolidSelect: boolean = false;
  showSplitSolidSelect: boolean = false;
  showPriceyVetSelect: boolean = false;
  potentialCheapVets: PotentialKeeper[] = [];
  potentialUndraftedRookies: PotentialKeeper[] = [];
  signedMaxPlayer: boolean = false;
  signedSecondMax: boolean = false;
  signedMaxpiring: boolean = false;
  usedSolidContract: boolean = false;
  splitSolidContract: boolean = false;
  potentialSplitSolid: boolean = false;
  alreadySigned: boolean = false;
  signedSolidDiffFrom29: number = 0;
  errorMessage: string = '';
  showError: boolean = false;

  filterPotentialKeepers(roster: Player[]) {
    roster.map((player: Player) => {
      if (player.keeperStatus === 1) {
        if (player.purchasePrice >= 40) {
          player.nextSeasonSalary = player.purchasePrice;
          player.contractLength = 2;
          this.keepersList.push(player);
          this.openKeeperSlots -= 1;
          this.maxPlayersList = this.maxPlayersList.filter(
            (player) => player.value.keeperStatus !== 1
          );
          this.maxPlayersList.map((player) => {
            const editedPlayer = player;
            editedPlayer.nextSeasonSalary =
              editedPlayer.value.purchasePrice + 5;
            editedPlayer.value.contractLength = 1;
            editedPlayer.viewValue = `${editedPlayer.value.player} (${editedPlayer.nextSeasonSalary}$ לעונה אחת)`;
            this.secondMaxPlayersList.push(editedPlayer);
          });
          this.signedMaxPlayer = true;
        }
        if (player.purchasePrice >= 30 && player.purchasePrice <= 39) {
          player.nextSeasonSalary = player.purchasePrice;
          player.contractLength = 1;
          this.keepersList.push(player);
          this.openKeeperSlots -= 1;
          this.signedMaxpiring = true;
        }
        if (player.purchasePrice >= 20 && player.purchasePrice <= 29) {
          player.nextSeasonSalary = player.purchasePrice;
          player.contractLength = 3;
          this.keepersList.push(player);
          this.openKeeperSlots -= 1;
          this.usedSolidContract = true;
          this.defaultSolidType = player.YOS >= 10 ? '3' : '1';
        }
        if (player.purchasePrice <= 19 && player.purchasePrice >= 10) {
          if (this.splitSolidOptions.length === 0) {
            player.nextSeasonSalary = player.purchasePrice;
            player.contractLength = 2;
            this.keepersList.push(player);
            this.openKeeperSlots -= 1;
            this.potentialSplitSolid = true;
            this.signedSolidDiffFrom29 = 29 - player.purchasePrice;
            this.splitSolidOptions.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$`,
            });
          } else {
            player.nextSeasonSalary = player.purchasePrice;
            player.contractLength = 1;
            this.keepersList.push(player);
            this.openKeeperSlots -= 1;
            this.signedSolidDiffFrom29 = 29 - player.purchasePrice;
            this.splitSolidOptions.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$`,
            });
            this.splitSolidContract = true;
            this.defaultSolidType = '2';
          }
        }
        if (player.YOS >= 10 && player.purchasePrice <= 9) {
          player.nextSeasonSalary = player.purchasePrice;
          player.contractLength = 1;
          this.keepersList.push(player);
          this.openKeeperSlots -= 1;
        }
        if (player.purchasePrice <= 5 && player.YOS === 1) {
          player.nextSeasonSalary = player.purchasePrice;
          player.contractLength = 2;
          this.keepersList.push(player);
          this.openKeeperSlots -= 1;
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
          case player.purchasePrice >= 10 && player.purchasePrice <= 29:
            this.potentialSolids.push({
              value: player,
              viewValue: `${player.player} (${player.purchasePrice}$)`,
            });
            if (player.purchasePrice >= 10 && player.purchasePrice <= 19) {
              this.splitSolidOptions.push({
                value: player,
                viewValue: `${player.player} (${player.purchasePrice}$`,
              });
            }
            if (player.YOS >= 10) {
              this.potentialPriceyVets.push({
                value: player,
                viewValue: `${player.player} (${player.purchasePrice}$)`,
              });
            }
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
        teamDataArray.finalRank,
        this.owedSalaries
      );
      this.veteransMarket = veteransMarketStatus(teamDataArray.finalRank);
      const rookiePickStatus = teamDataArray.rookiesDraftDetails;
      delete rookiePickStatus.__typename;
      this.rookiesDraft = processRookieDraftPick(rookiePickStatus);
    }
  }

  onCheck(event: MatCheckboxChange): void {
    if (event.checked) {
      this.noVetMarketChecked = true;
      this.openKeeperSlots += 1
    } else {
      this.noVetMarketChecked = false;
      this.openKeeperSlots -= 1
    }  
  }

  onFirstMaxSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      const selectedPlayer = event.value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      selectedPlayer.contractLength = 2;
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
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      this.signedSecondMax = true;
      const selectedPlayer = event.value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice + 5;
      selectedPlayer.contractLength = 1;
      this.keepersList.push(selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onMaxpiringSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      const selectedPlayer = event.value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      selectedPlayer.contractLength = 1;
      this.keepersList.push(selectedPlayer);
      this.maxpiringPlayerOptions.filter((player) => player !== selectedPlayer);
      this.openKeeperSlots -= 1;
      this.signedMaxpiring = true;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  selectSolidType(event: any): void {
    switch (event.value) {
      case '1':
        this.showSplitSolidSelect = false;
        this.showPriceyVetSelect = false;
        this.showFullSolidSelect = true;
        break;
      case '2':
        this.showFullSolidSelect = false;
        this.showPriceyVetSelect = false;
        this.showSplitSolidSelect = true;
        break;
      case '3':
        this.showSplitSolidSelect = false;
        this.showFullSolidSelect = false;
        this.showPriceyVetSelect = true;
        break;
    }
  }

  fullSolidSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      const selectedPlayer = event.value.value;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      selectedPlayer.contractLength = 3;
      this.keepersList.push(selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
      this.usedSolidContract = true;
    }
  }

  handleClick(event: any): void {
    const optionCount = this.selectRef.options.length;
    if (optionCount === 1) {
      this.alreadySigned = true;
    } else {
      this.alreadySigned = false;
    }
}

  splitSolidSelect(event: MatSelectChange): void {
    this.showError = false;
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      if (event.value.length > 1) {
        const firstPlayer = event.value[0].value;
        const secondPlayer = event.value[1].value;
        if (firstPlayer.purchasePrice + secondPlayer.purchasePrice > 29) {
          this.errorMessage = 'סכום משכורות השחקנים עולה על 29!';
          this.showError = true;
          return;
        } else {
          firstPlayer.nextSeasonSalary = firstPlayer.purchasePrice;
          firstPlayer.contractLength = 2;
          secondPlayer.nextSeasonSalary = secondPlayer.purchasePrice;
          secondPlayer.contractLength = 1;
          this.keepersList.push(firstPlayer, secondPlayer);
          this.openKeeperSlots -= 2;
          this.auctionBudget -=
            firstPlayer.nextSeasonSalary + secondPlayer.nextSeasonSalary;
          this.splitSolidContract = true;
          this.showError = false;
        }
      } else {
        setTimeout(() => {
          this.errorMessage = 'עליך לבחור שחקן שני';
          this.showError = true;
        }, 3000);
      }
    }
  }

  onPriceyVetSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      const selectedPlayer = event.value.value;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      selectedPlayer.contractLength = 2;
      this.keepersList.push(selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
      this.usedSolidContract = true;
    }
  }

  onCheapVeteranSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      let idx = event.value.length
      const selectedPlayer = event.value[idx-1].value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      selectedPlayer.contractLength = 1;
      this.keepersList.push(selectedPlayer);
      this.potentialCheapVets.filter((player) => player !== selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  onUndraftedRookieSelect(event: MatSelectChange): void {
    if (this.openKeeperSlots === 0) {
      this.errorMessage = 'לא נותרה לך משבצת פנויה לקיפר';
      this.showError = true;
      return;
    } else {
      this.showError = false;
      let idx = event.value.length
      const selectedPlayer = event.value[idx-1].value;
      selectedPlayer.keeperStatus = 1;
      selectedPlayer.nextSeasonSalary = selectedPlayer.purchasePrice;
      selectedPlayer.contractLength = 2;
      this.keepersList.push(selectedPlayer);
      this.potentialUndraftedRookies.filter((player) => player !== selectedPlayer);
      this.openKeeperSlots -= 1;
      this.auctionBudget -= selectedPlayer.nextSeasonSalary;
    }
  }

  getContractLengthDescription(contractLength: number | undefined): string {
    if (typeof contractLength === 'number') {
      switch (contractLength) {
        case 1:
          return 'שנה';
        case 2:
          return 'שנתיים';
        case 3:
          return 'שלוש שנים';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  toggleMaxPlayers(): void {
    const maxPlayers = this.keepersList.filter(
      (el) => el.nextSeasonSalary! >= 40
    );

    if (maxPlayers[0].contractLength! > maxPlayers[1].contractLength!) {
      maxPlayers[0].contractLength! -= 1;
      maxPlayers[0].nextSeasonSalary! += 5;
      maxPlayers[1].contractLength! += 1;
      maxPlayers[1].nextSeasonSalary! -= 5;
    } else {
      maxPlayers[0].contractLength! += 1;
      maxPlayers[0].nextSeasonSalary! -= 5;
      maxPlayers[1].contractLength! -= 1;
      maxPlayers[1].nextSeasonSalary! += 5;
    }
  }

  toggleSplitSolids(): void {
    const splitSolidKeepers = this.splitSolidOptions;
    let matchesFound = 0;

    for (const keeper of splitSolidKeepers) {
      const correspondingKeeper = this.keepersList.find(
        (el) => el.player === keeper.value.player && el.YOS === keeper.value.YOS
      );

      if (correspondingKeeper) {
        const prevContractLength = keeper.value.contractLength;
        switch (prevContractLength) {
          case 1:
            correspondingKeeper.contractLength! += 1;
            break;
          case 2:
            correspondingKeeper.contractLength! -= 1;
            break;
        }
        matchesFound++;

        if (matchesFound === 2) {
          break;
        }
      }
    }
  }

  handleReset(): void {
    this.noVetMarketChecked = false;
    this.keepersList = [];
    this.maxPlayersList = [];
    this.openKeeperSlots = 4;
    this.secondMaxPlayersList = [];
    this.maxpiringPlayerOptions = [];
    this.potentialSolids = [];
    this.splitSolidOptions = [];
    this.potentialPriceyVets = [];
    this.showFullSolidSelect = false;
    this.showSplitSolidSelect = false;
    this.showPriceyVetSelect = false;
    this.potentialCheapVets = [];
    this.potentialUndraftedRookies = [];
    this.signedMaxPlayer = false;
    this.signedSecondMax = false;
    this.signedMaxpiring = false;
    this.usedSolidContract = false;
    this.splitSolidContract = false;
    this.potentialSplitSolid = false;
    this.alreadySigned = false;
    this.signedSolidDiffFrom29 = 0;
    this.errorMessage = '';
    this.showError = false;
    this.ngOnInit();
  }

  handleSubmit(): void {
    this.errorMessage = "לא פעיל עד אמצע אוקטובר 2024"
    this.showError = true;
  }

}
