import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { UsersComponent } from './components/users/users.component';
import { TeamsComponent } from './components/teams/teams/teams.component';
import { FormsModule } from '@angular/forms'; 
import { TeamModalComponent } from './components/teams/add-team/add-team-modal/team-modal.component';

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