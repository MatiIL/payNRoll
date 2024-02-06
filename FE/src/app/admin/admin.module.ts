import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminToolsComponent } from './admin-tools/admin-tools.component';
import { UsersComponent } from './components/users/users.component';

@NgModule({
  declarations: [
    UsersComponent,
    // GroupsComponent,
    // LotteryComponent
  ],
  imports: [
    CommonModule,
    AdminToolsComponent,
  ],
  exports: [
    AdminToolsComponent,
    UsersComponent,
    // GroupsComponent,
    // LotteryComponent
  ]
})
export class AdminModule { }
