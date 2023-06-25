export interface Team {
    _id: string,
    name: string,
    manager_id: string,
    nextYearBudget: number,
    currentRoster: [
        {
            player: string,
            purchasePrice: number,
            keeperStatus: number,
            YOS: number
        }
    ],
    prevRosters: [[]],
    draftRecord: [
        {
            season: number,
            draftPosition: number,
            playerDrafted: string,
        }
    ],
}