import { environment } from '../environments/environment';

export const getServerUrl = () => {
  if (environment.production) {
    return 'https://paynroll-server.onrender.com'
  } 
  return "http://localhost:9000";
}

export const findContractLength = (price: number, yearsOfService: number) => {
  let contractLength = 1;
  if (price >= 40) {
    return contractLength = 2;
  } else {
    if (price <= 39 && price >= 30) {
      return contractLength;
    } else {
      if (yearsOfService >= 10)  return contractLength = price >= 10 ? 2 : 1;
      if (yearsOfService === 1) return contractLength = 2;
      if (price <= 29 && price >= 10) return contractLength = 3;
    }
  } 
  return contractLength;
}

interface RookieDraftPickDetails {
  incomingPick: string;
  outgoingPick: string;
  swapRightsWith: string;
  draftPosition: number;
}

export const processRookieDraftPick = (pickStatus: RookieDraftPickDetails): string => {
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