import { environment } from '../environments/environment'

export const getServerUrl = () => {
  if (environment.production) {
    return 'https://paynroll-server.onrender.com'
  } 
  return "http://localhost:9000";
}

export const convertRankToOdds = (rank: number) => {
  let odds = 0;
  if (rank === 1 || rank === 2 || rank === 3) {
    return odds;
  } else if (rank === 9 || rank === 10 || rank === 11) {
    return odds = 21;
  } else {
    switch (rank) {
      case 4:
        odds = 0.5;
        break;
      case 5:
        odds = 3.5;
        break;
      case 5.5:
        odds = 5.25;
        break;
      case 6:
        odds = 7;
        break;
      case 7:
        odds = 11;
        break;
      case 8:
        odds = 15;
        break;
    }
    return odds;
  }
}

type TeamData = {
  name: string;
  odds: number;
};

type LotteryResult = {
  name: string;
  drawnPick: number; 
};

export const lotteryCalculator = (teams: TeamData[]): LotteryResult[] => {
  const odds = teams.map(team => team.odds);
  const results: LotteryResult[] = [];

  for (let drawnPick = 1; drawnPick <= 3; drawnPick++) {
    const pickIndex = drawPick(odds);
    results.push({ name: teams[pickIndex].name, drawnPick });
    teams.splice(pickIndex, 1);
    odds.splice(pickIndex, 1);
  }

  return results;
};

function drawPick(odds: number[]) {
  let totalOdds = odds.reduce((acc, val) => acc + val, 0);
  if (totalOdds < 100) {
    const difference = 100 - totalOdds;
    const remainingTeams = odds.filter(odd => odd !== 0);
    const additionalOdds = difference / remainingTeams.length;
    odds = odds.map(odd => odd === 0 ? odd : odd + additionalOdds);
    totalOdds = odds.reduce((acc, val) => acc + val, 0);
  }
  const normalizedOdds = odds.map(odd => odd / totalOdds);
  const randomNumber = Math.random();
  let cumulativeProbability = 0;
  const shuffledIndices = shuffle([...Array(normalizedOdds.length).keys()]); 

  for (const index of shuffledIndices) {
    cumulativeProbability += normalizedOdds[index];
    if (randomNumber < cumulativeProbability) {
      return index;
    }
  }

  // Fallback: return last index
  return normalizedOdds.length - 1;
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}