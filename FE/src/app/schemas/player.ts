export interface Player {
    __typename?: string;
    player: string;
    purchasePrice: number;
    keeperStatus: number;
    nextSeasonSalary?: number;
    contractLength?: number;
    YOS: number;
  }