import { Injectable } from '@angular/core';
import { Player } from '../schemas/player';

@Injectable({
  providedIn: 'root',
})
export class TeamModalService {
  userId: string = '';
  teamName: string = '';
  payrollList: Player[] = [];

  constructor() {}
}
