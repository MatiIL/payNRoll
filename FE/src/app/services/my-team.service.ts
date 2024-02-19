import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApolloQueryResult } from '@apollo/client/core';

const FIND_TEAM_QUERY = gql`
  query FindTeam($name: String!) {
    findTeam(name: $name) {
      _id
      name
      manager_id
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
      }
      draftRecord {
        season
        draftPosition
        playerDrafted
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class MyTeamService {

  constructor(
    private apollo: Apollo,
    ) { }

  findTeam(name: string): Observable<any> {
    return this.apollo.query({
      query: FIND_TEAM_QUERY,
      variables: {
        name: name
      }
    }).pipe(
        map((result: ApolloQueryResult<any>) => result.data.findTeam)
    );
  }

  saveToLocalStorage(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

}