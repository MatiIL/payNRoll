import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CreateTeamInput = {
  currentRoster: Array<PlayerInput>;
  draftRecord: Array<DraftRecordInput>;
  manager_id: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nextYearBudget: Scalars['Int']['input'];
  prevRosters: Array<Array<PlayerInput>>;
};

export type ChosenKeepersInput = {
  manager_id: Scalars['String']['input'];
  nextYearBudget: Scalars['Int']['input'];
  currentRoster: Array<PlayerInput>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  teamName: Scalars['String']['input'];
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
  addNewUser: User;
  chosenKeepersInput: ChosenKeepersInput;
};

export type MutationAddNewTeamArgs = {
  team: CreateTeamInput;
};

export type MutationAddNewUserArgs = {
  user: CreateUserInput;
};

export type PlayerInfo = {
  YOS: Scalars['Float']['output'];
  keeperStatus: Scalars['Float']['output'];
  player: Scalars['String']['output'];
  purchasePrice: Scalars['Float']['output'];
  nextSeasonSalary?: Maybe<Scalars['Float']['output']>;
  contractLength?: Maybe<Scalars['Float']['input']>;
};

export type PlayerInput = {
  YOS: Scalars['Int']['input'];
  keeperStatus: Scalars['Int']['input'];
  player: Scalars['String']['input'];
  purchasePrice: Scalars['Int']['input'];
  contractLength?: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
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

export type Team = {
  __typename?: 'Team';
  _id: Scalars['String']['output'];
  currentRoster: Array<PlayerInfo>;
  draftRecord: Array<DraftRecord>;
  manager_id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nextYearBudget: Scalars['Float']['output'];
  finalRank: Scalars['Int']['output'];
  prevRosters: Array<Array<Scalars['String']['output']>>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  teamName: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type AddNewUserMutationVariables = Exact<{
  user: CreateUserInput;
}>;

export type AddNewUserMutation = {
  __typename?: 'Mutation';
  addNewUser: {
    __typename?: 'User';
    userId: string;
    firstName: string;
    teamName: string;
  };
};

export const AddNewUserDocument = gql`
  mutation AddNewUser($user: CreateUserInput!) {
    addNewUser(user: $user) {
      userId
      firstName
      teamName
    }
  }
`;

export const ChosenKeepersDocument = gql`
  mutation UpdateChosenKeepers($input: ChosenKeepersInput!) {
  updateChosenKeepers(input: $input) {
    nextYearBudget
    currentRoster {
      player
      purchasePrice
      keeperStatus
      YOS
      contractLength
    }
  }
}
`;

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

@Injectable({
  providedIn: 'root',
})
export class AddNewUserGQL extends Apollo.Mutation<
  AddNewUserMutation,
  AddNewUserMutationVariables
> {
  override document = AddNewUserDocument;

  constructor(apollo: Apollo.Apollo) {
    super(apollo);
  }
}
