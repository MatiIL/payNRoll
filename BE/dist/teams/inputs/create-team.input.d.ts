export declare class CreateTeamInput {
    name: string;
    manager_id: string;
    nextYearBudget: number;
    currentRoster: PlayerInput[];
    prevRosters: PlayerInput[][];
    draftRecord: DraftRecordInput[];
}
declare class PlayerInput {
    player: string;
    purchasePrice: number;
    keeperStatus: number;
    YOS: number;
}
declare class DraftRecordInput {
    season: number;
    draftPosition: number;
    playerDrafted: string;
}
export {};
