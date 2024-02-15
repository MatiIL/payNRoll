import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Player } from '../../../../../schemas/player';
import { TeamModalService } from 'src/app/services/team-modal.service';
import { Team } from '../../../../../schemas/team';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class TeamFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() userId: string = '';
  @Input() teamName: string = '';
  payrollList: Player[] = [];
  playerForm!: FormGroup;

  ngOnInit(): void {
    this.teamForm = this.fb.group({
      name: [this.teamName, Validators.required],
      managerId: [this.userId, Validators.required],
      nextYearBudget: [0],
      incomingPick: [''],
      outgoingPick: [''],
      swapRightsWith: [''],
      draftPosition: [0],
      playerName: [''],
      purchasePrice: [0],
      keeperStatus: [''],
      yearsOfService: [0],
    });
  }

  teamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamModalService: TeamModalService,
    private apollo: Apollo
  ) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      managerId: ['', Validators.required],
      nextYearBudget: [''],
      incomingPick: [''],
      outgoingPick: [''],
      swapRightsWith: [''],
      draftPosition: [0],
      playerName: ['', Validators.required],
      purchasePrice: [0, Validators.required],
      keeperStatus: ['0', Validators.required],
      yearsOfService: [0, Validators.required],
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
      this.payrollList.push(newPlayer);
      this.teamModalService.payrollList.push(newPlayer);
      this.teamForm.get('playerName')!.reset();
      this.teamForm.get('purchasePrice')!.reset();
      this.teamForm.get('keeperStatus')!.reset('0'); 
      this.teamForm.get('yearsOfService')!.reset();
    }
  }

  CREATE_TEAM_MUTATION = gql`
    mutation AddNewTeam($team: CreateTeamInput!) {
      addNewTeam(team: $team) {
        _id
        name
        manager_id
      }
    }
  `;

  async onSubmit(): Promise<void> {
    if (this.teamForm.valid) {
      const formattedRoster = this.payrollList.map((player) => ({
        player: player.player,
        purchasePrice: player.purchasePrice,
        keeperStatus: player.keeperStatus,
        YOS: player.YOS,
      }));

      const createTeamInput: Team = {
        name: this.teamForm.get('name')!.value,
        manager_id: this.teamForm.get('managerId')!.value,
        nextYearBudget: this.teamForm.get('nextYearBudget')!.value,
        rookiesDraftDetails: {
          incomingPick: this.teamForm.get('incomingPick')!.value,
          outgoingPick: this.teamForm.get('outgoingPick')!.value,
          swapRightsWith: this.teamForm.get('swapRightsWith')!.value,
          draftPosition: this.teamForm.get('draftPosition')!.value,
        },
        currentRoster: formattedRoster,
        prevRosters: [],
        draftRecord: [{ season: 0, draftPosition: 0, playerDrafted: '' }],
      };

      try {
        this.apollo
          .mutate({
            mutation: this.CREATE_TEAM_MUTATION,
            variables: {
              team: createTeamInput,
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
        console.error('Error adding new team:', error);
      }
    }
  }
}
