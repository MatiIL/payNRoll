import { environment } from '../environments/environment';

export function getServerUrl(): string {
  if (environment.production) {
    return 'https://paynroll-server.onrender.com';
  }
  return 'http://localhost:9000';
}

export function findContractLength(
  price: number,
  yearsOfService: number
): number {
  let contractLength = 1;
  if (price >= 40) {
    return (contractLength = 2);
  } else {
    if (price <= 39 && price >= 30) {
      return contractLength;
    } else {
      if (yearsOfService >= 10) return (contractLength = price >= 10 ? 2 : 1);
      if (yearsOfService === 1) return (contractLength = 2);
      if (price <= 29 && price >= 10) return (contractLength = 3);
    }
  }
  return contractLength;
}

export function calcAuctionBudget (budget: number, rank: number, salaries: number[]): number {
  let rankBonus: number = 0;
  const reduceSalaries = salaries.reduce((acc, curr) => acc - curr, budget); 

  switch (rank) {
    case 1:
      rankBonus = 1;
      break;
    case 2:
      rankBonus = 2;
      break;
    case 3:
      rankBonus = 3;
      break;
    case 4:
      rankBonus = 11;
      break;
    case 5:
      rankBonus = 10;
      break;
    case 6:
      rankBonus = 9;
      break;
    case 7:
      rankBonus = 8;
      break;
    case 8:
      rankBonus = 7;
      break;
    case 9:
      rankBonus = 6;
      break;
    case 10:
      rankBonus = 5;
      break;
    case 11:
      rankBonus = 4;
      break;
  }

  return reduceSalaries + rankBonus;
}

interface RookieDraftPickDetails {
  incomingPick: string;
  outgoingPick: string;
  swapRightsWith: string;
  draftPosition: number;
}

export function processRookieDraftPick(
  pickStatus: RookieDraftPickDetails
): string {
  let result = '';

  if (pickStatus.incomingPick !== '') {
    result += `Got an incoming pick from: ${pickStatus.incomingPick}.\n`;
  }
  if (pickStatus.outgoingPick !== '') {
    result += `Owe a pick to: ${pickStatus.outgoingPick}.\n`;
  }
  if (pickStatus.swapRightsWith !== '') {
    const [firstElement, ...rest] = pickStatus.swapRightsWith.split(' ');
    result += `${firstElement} a pick swap with ${rest.join(' ')}`;
  }
  return result.trim();
}

export function veteransMarketStatus(rank: number): string {
  let position;

  switch (rank) {
    case 1:
      position = 'ראשון';
      break;
    case 2:
      position = 'שני';
      break;
    case 3:
      position = 'שלישי';
      break;
    case 4:
      position = 'רביעי';
      break;
    case 5:
      position = 'חמישי';
      break;
    case 6:
      position = 'שישי';
      break;
    case 7:
      position = 'שביעי';
      break;
    case 8:
      position = 'שמיני';
      break;
    case 9:
      position = 'תשיעי';
      break;
    case 10:
      position = 'עשירי';
      break;
    case 11:
      position = 'אחרון';
      break;
  }
  
  let discountCaluse = `, בהנחה של ${6 - rank}$ ממחירו הנקוב.`;
  let message = `אתה בוחר ${position} את מי להחתים מבין כל השחקנים בעלי 10 שנות ניסיון ומעלה, שלא הוחתמו על חוזה ${
    rank <= 5 ? discountCaluse : ''
  }`;

  return message;
}
