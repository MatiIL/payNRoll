import { Player } from "./player";

export interface Team {
  _id?: string;
  name: string;
  manager_id: string;
  nextYearBudget: number;
  rookiesDraftDetails: {
    incomingPick: string;
    outgoingPick: string;
    swapRightsWith: string;
    draftPosition: number;
  };
  currentRoster: Player[];
  prevRosters?: string[][];
  draftRecord?: [
    {
      season: number;
      draftPosition: number;
      playerDrafted: string;
    }
  ];
}
