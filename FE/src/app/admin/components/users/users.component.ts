import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ApolloQueryResult } from '@apollo/client/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(
    private apollo: Apollo,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. User not authenticated.');
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `${token}`);

    this.apollo.query({
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
        headers: headers
      }
    }).subscribe({
      next: (result: ApolloQueryResult<any>) => {
        this.users = result.data?.allUsers ?? [];
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  deleteUser(userId: string): void {
    const mutation = gql`
      mutation DeleteUser($userId: String!) {
        deleteUser(userId: $userId)
      }
    `;

    this.apollo.mutate({
      mutation,
      variables: {
        userId
      }
    }).subscribe({
      next: (result) => {
        console.log('User deleted successfully:', result);
        this.users = this.users.filter(user => user.userId !== userId);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

}