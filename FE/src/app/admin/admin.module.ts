import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { UsersComponent } from './components/users/users.component';
import { TeamsComponent } from './components/teams/teams-view/teams.component';
import { FormsModule } from '@angular/forms'; 
import { TeamModalComponent } from './components/teams/add-team/add-team-modal/team-modal.component';
import { EditTeamModalComponent } from './components/teams/edit-team/edit-team-modal/edit-team-modal.component';
import { EditTeamFormComponent } from './components/teams/edit-team/edit-team-form/edit-team-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    TeamsComponent,
    
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
  ]
})
export class AdminModule { }