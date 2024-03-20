import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { UsersComponent } from './components/users/users.component';
import { TeamsComponent } from './components/teams/teams-view/teams.component';
import { FormsModule } from '@angular/forms'; 
import { TeamModalComponent } from './components/teams/add-team/add-team-modal/team-modal.component';
import { LotteryComponent } from './components/lottery/lottery-view/lottery.component';
import { LotteryModalComponent } from './components/lottery/lottery-modal/lottery-modal/lottery-modal.component';

@NgModule({
  declarations: [
    UsersComponent,
    TeamsComponent,
    LotteryComponent,
  ],
  imports: [
    CommonModule,
    AdminToolsComponent,
    TeamModalComponent,
    FormsModule,
  ],
  exports: [
    AdminToolsComponent,
    UsersComponent,
    TeamsComponent,
    LotteryComponent,
  ]
})
export class AdminModule { }