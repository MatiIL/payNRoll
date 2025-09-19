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
  console.log(teams);
  let availableTeams = [...teams];
  let results: LotteryResult[] = [];

  for (let drawnPick = 1; drawnPick <= 3; drawnPick++) { //הקוד בלולאה מורץ 3 פעמים בלבד
    const odds = availableTeams.map(team => team.odds);
    const pickIndex = drawPick(odds); 
    const winner = availableTeams[pickIndex]; //האינדקס של מאד עמוס הוא 7, של ניו הורייזון 0
    results.push({ name: winner.name, drawnPick });
    availableTeams.splice(pickIndex, 1); //הסרת הקבוצה הזוכה ממערך הקבוצות 
  }

  return results;
};

function drawPick(odds: number[]) {
  let totalOdds = odds.reduce((acc, val) => acc + val, 0); //הערך הצבור של סך סיכויי הזכייה
  if (totalOdds !== 100) { //תנאי שתקף להגרלות 2 ו-3
    odds = odds.map(odd => (odd / totalOdds) * 100);
    totalOdds = odds.reduce((acc, val) => acc + val, 0); //לתת לסך סיכויי הזכייה ערך צבור מחדש שאמור להיות 100
    console.log(totalOdds);
  }
  const normalizedOdds = odds.map(odd => odd / totalOdds); //המרת אחוזי הסכייה להסתברויות שמסתכמות ב 1
  const randomNumber = Math.random(); //מייצר מספר רנדומלי בין 0 ל 1
  let cumulativeProbability = 0; //ערך ראשוני להסתברויות הצבורות
  const shuffledIndices = shuffle([...Array(normalizedOdds.length).keys()]);  //ערבוב מערך ההסתברויות

  for (const index of shuffledIndices) { //הלולאה רצה על כל האינדקסים (המעורבבים) כל עוד התנאי שבה לא מתקיים
    cumulativeProbability += normalizedOdds[index]; //כל עוד התנאי שמתחת לא מתקיים, הערב הצבור גדל
    if (cumulativeProbability > randomNumber) {
      return index;
    }
  }

  // Fallback: return last index
  return normalizedOdds.length - 1; //לא אמור לקרות, אלא אם חלה שגיאת עיגול קריטית
}

function shuffle(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}