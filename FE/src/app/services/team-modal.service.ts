import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamModalService {
  userId: string = '';
  teamName: string = '';

  constructor() {}
}
