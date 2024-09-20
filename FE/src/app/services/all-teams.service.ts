import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client/core';

const GET_ALL_TEAMS_QUERY = gql`
  query {
    findAllTeams {
      _id
      name
      nextYearBudget
      finalRank
      rookiesDraftDetails {
        incomingPick
        outgoingPick
        swapRightsWith
        draftPosition
      }
      currentRoster {
        player
        purchasePrice
        keeperStatus
        YOS
        nextSeasonSalary
        contractLength
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AllTeamsService {
  constructor(private apollo: Apollo) {}

  getAllTeams(): Observable<any> {
    return this.apollo
      .query({
        query: GET_ALL_TEAMS_QUERY,
      })
      .pipe(
        map((result: ApolloQueryResult<any>) => result.data.findAllTeams),
        catchError((error) => {
          console.error('Error fetching teams:', error);
          return throwError('Failed to fetch teams. Please try again later.');
        })
      );
  }

  saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
