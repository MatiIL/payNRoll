import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateTeamInput = {
  currentRoster: Array<PlayerInput>;
  draftRecord: Array<DraftRecordInput>;
  manager_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nextYearBudget: Scalars['Int']['input'];
  prevRosters: Array<Array<PlayerInput>>;
  rookiesDraftDetails: RookiesDraftDetailsInput;
};

export type UpdateTeamInput = {
  _id?: Scalars['String'];
  name?: Scalars['String'];
  nextYearBudget?: Scalars['Int'];
  draftPosition: Scalars['Float']['output'];
  incomingPick: Scalars['String']['output'];
  outgoingPick: Scalars['String']['output'];
  swapRightsWith: Scalars['String']['output'];
  currentRoster?: Array<PlayerInput>;
  prevRosters?: Array<Array<PlayerInput>>;
  draftRecord?: Array<DraftRecordInput>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  teamName: Scalars['String']['input'];
  isAdmin: Scalars['Boolean']['input'];
};

export type DraftRecord = {
  __typename?: 'DraftRecord';
  draftPosition: Scalars['Float']['output'];
  playerDrafted: Scalars['String']['output'];
  season: Scalars['Float']['output'];
};

export type DraftRecordInput = {
  draftPosition: Scalars['Int']['input'];
  playerDrafted: Scalars['String']['input'];
  season: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addNewTeam: Team;
  updateTeamProperty: Team;
  addNewUser: User;
  deleteUser: Scalars['Boolean']['output'];
};


export type MutationAddNewTeamArgs = {
  team: CreateTeamInput;
};

export type MutationUpdateTeamPropertyArgs = {
  team: UpdateTeamInput;
}


export type MutationAddNewUserArgs = {
  user: CreateUserInput;
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};

export type PlayerInfo = {
  __typename?: 'PlayerInfo';
  YOS: Scalars['Float']['output'];
  keeperStatus: Scalars['Float']['output'];
  player: Scalars['String']['output'];
  purchasePrice: Scalars['Float']['output'];
};

export type PlayerInput = {
  YOS: Scalars['Int']['input'];
  keeperStatus: Scalars['Int']['input'];
  player: Scalars['String']['input'];
  purchasePrice: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  findAllTeams: Array<Team>;
  findTeam?: Maybe<Team>;
  user: User;
};


export type QueryFindTeamArgs = {
  name: Scalars['String']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
};

export type RookiesDraftDetails = {
  __typename?: 'RookiesDraftDetails';
  draftPosition: Scalars['Float']['output'];
  incomingPick: Scalars['String']['output'];
  outgoingPick: Scalars['String']['output'];
  swapRightsWith: Scalars['String']['output'];
};

export type RookiesDraftDetailsInput = {
  draftPosition: Scalars['Int']['input'];
  incomingPick: Scalars['String']['input'];
  outgoingPick: Scalars['String']['input'];
  swapRightsWith: Scalars['String']['input'];
};

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String']['output'];
  currentRoster: Array<PlayerInfo>;
  draftRecord: Array<DraftRecord>;
  manager_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nextYearBudget: Scalars['Float']['output'];
  finalRank: Scalars['Float']['output'];
  prevRosters: Array<Array<Scalars['String']['output']>>;
  rookiesDraftDetails: RookiesDraftDetails;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  isAdmin: Scalars['Boolean']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  teamName: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export type AddNewUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;


export type AddNewUserMutation = { __typename?: 'Mutation', addNewUser: { __typename?: 'User', userId: string, firstName: string, teamName: string } };

export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  deleteUser(userId: $userId)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteUserGQL extends Apollo.Mutation<DeleteUserMutation, DeleteUserMutationVariables> {
    override document = DeleteUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const AddNewUserDocument = gql`
    mutation AddNewUser($user: CreateUserInput!) {
  addNewUser(user: $user) {
    userId
    firstName
    teamName
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class AddNewUserGQL extends Apollo.Mutation<AddNewUserMutation, AddNewUserMutationVariables> {
    override document = AddNewUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }