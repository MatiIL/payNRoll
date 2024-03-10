import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Player } from 'src/app/schemas/player';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-team-form',
  templateUrl: './edit-team-form.component.html',
  styleUrls: ['./edit-team-form.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditTeamFormComponent implements OnInit {
  @Input() team: any;
  teamForm!: FormGroup;
  selectedPlayer: string = '';

  constructor(private fb: FormBuilder, private apollo: Apollo) {}

  ngOnInit(): void {
    console.log('Initial team object: ', this.team);
    this.teamForm = this.fb.group({
      name: [this.team.name],
      nextYearBudget: [this.team.nextYearBudget],
      incomingPick: [this.team.rookiesDraftDetails.incomingPick],
      outgoingPick: [this.team.rookiesDraftDetails.outgoingPick],
      swapRightsWith: [this.team.rookiesDraftDetails?.swapRightsWith],
      draftPosition: [this.team.rookiesDraftDetails?.draftPosition],
      playerName: [''],
      purchasePrice: [0],
      keeperStatus: [''],
      yearsOfService: [0],
      currentRoster: [this.team.currentRoster],
      prevRosters: this.fb.array([]), // You need to initialize this properly based on the team data
      draftRecord: this.fb.array([]), // You need to initialize this properly based on the team data
    });
  }

  onPlayerAdd() {
    if (this.teamForm.valid) {
      const newPlayer: Player = {
        player: this.teamForm.get('playerName')!.value,
        purchasePrice: this.teamForm.get('purchasePrice')!.value,
        keeperStatus: parseInt(this.teamForm.get('keeperStatus')!.value, 10),
        YOS: this.teamForm.get('yearsOfService')!.value,
      };
      this.team.currentRoster.push(newPlayer);
      this.teamForm.get('playerName')!.reset();
      this.teamForm.get('purchasePrice')!.reset();
      this.teamForm.get('keeperStatus')!.reset('0');
      this.teamForm.get('yearsOfService')!.reset();
    }
  }

  onPlayerRemove() {
    const currentRosterControl = this.teamForm.get('currentRoster');
    if (currentRosterControl) {
      const index = this.team.currentRoster.findIndex(
        (p: Player) => p.player === this.selectedPlayer
      );
      if (index !== -1) {
        this.team.currentRoster.splice(index, 1);
        currentRosterControl.setValue(this.team.currentRoster);
      }
    }
  }

  UPDATE_TEAM_MUTATION = gql`
    mutation UpdateTeamProperty($team: UpdateTeamInput!) {
      updateTeamProperty(team: $team) {
        _id
      }
    }
  `;

  async onSubmit() {
    const formattedRoster = this.team.currentRoster.map((player: Player) => ({
      player: player.player,
      purchasePrice: player.purchasePrice,
      keeperStatus: player.keeperStatus,
      YOS: player.YOS,
    }));

    const updatedFields: { [key: string]: any } = Object.keys(
      this.teamForm.value
    ).reduce((acc: { [key: string]: any }, key) => {
      if (this.teamForm.value[key] !== this.team[key]) {
        if (
          key !== 'playerName' && 
          key !== 'purchasePrice' && 
          key !== 'keeperStatus' &&
          key !== 'yearsOfService'
          ) {
          acc[key] = this.teamForm.value[key];
        }
      }
      return acc;
    }, {});
    
    updatedFields['name'] = this.team.name;
    updatedFields['currentRoster'] = formattedRoster;

    try {
      this.apollo
        .mutate({
          mutation: this.UPDATE_TEAM_MUTATION,
          variables: {
            team: {
              _id: this.team._id,
              ...updatedFields,
            },
          },
        })
        .pipe(map((result) => result.data))
        .subscribe({
          next: (data: any) => {
            console.log('New team added:', data.addNewTeam);
          },
          error: (error) => {
            console.error('Error adding new team:', error);
          },
        });
    } catch (error) {
      console.error('Error updating team:', error);
    }
  }
}
