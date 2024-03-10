import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { TeamModalComponent } from '../teams/add-team/add-team-modal/team-modal.component';
import { TeamModalService } from 'src/app/services/team-modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apollo: Apollo,
    private modal: NgbModal,
    private teamModalService: TeamModalService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.apollo
      .query({
        query: gql`
          query {
            allUsers {
              userId
              email
              firstName
              lastName
              teamName
              isAdmin
            }
          }
        `,
        context: {
          headers: headers,
        },
      })
      .subscribe({
        next: (result: ApolloQueryResult<any>) => {
          this.users = result.data?.allUsers ?? [];
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
  }

  deleteUser(userId: string): void {
    const mutation = gql`
      mutation DeleteUser($userId: String!) {
        deleteUser(userId: $userId)
      }
    `;

    this.apollo
      .mutate({
        mutation,
        variables: {
          userId,
        },
      })
      .subscribe({
        next: (result) => {
          console.log('User deleted successfully:', result);
          this.users = this.users.filter((user) => user.userId !== userId);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        },
      });
  }

  modalOptions: NgbModalOptions = {
    fullscreen: true
};

  openTeamModal(userId: string, teamName: string): void {
    this.teamModalService.userId = userId;
    this.teamModalService.teamName = teamName;
    const modalRef = this.modal.open(TeamModalComponent, this.modalOptions);
  }
}
