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

export function calcAuctionBudget (budget: number, salaries: number[]): number {
  return salaries.reduce((acc, curr) => acc - curr, budget); 
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
    result += `You have an incoming pick from: ${pickStatus.incomingPick}`;
  }
  if (pickStatus.outgoingPick !== '') {
    result += `You owe a pick to: ${pickStatus.outgoingPick} `;
  }
  if (pickStatus.swapRightsWith !== '') {
    const [firstElement, ...rest] = pickStatus.swapRightsWith.split(' ');
    result += `You ${firstElement} a pick swap with ${rest.join(' ')}`;
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
  
  let discountCaluse = `בהנחה של ${6 - rank}$ ממחירו הנקוב.`;
  let message = `אתה בוחר ${position} את מי להחתים מבין כל השחקנים בעלי 10 שנות ניסיון ומעלה, שלא הוחתמו על חוזה, ${
    rank <= 5 ? discountCaluse : ''
  }`;

  return message;
}
