import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectValueService {
  private fantasyStrategy: { [key: string]: string } = {
    one: 'balance, well rouneded',
    two: 'punt',
    three: 'depth, consistency',
    four: 'sleepers, streamers'
  };

  private dynastyStrategy: { [key: string]: string } = {
    one: 'elite, max, top, studs',
    two: 'solid, middle, affordable',
    three: 'young, promising, leap',
    four: 'saving, anticipating, big splash'
  };

  private managerStyle: { [key: string]: string } = {
    one: 'Aingels, strategizer, hardball negotiator',
    two: 'Prestigious, draft-oriented',
    three: 'MoreyBallers, analytic, stat-oriented, hardball negotiator',
    four: 'Pick-n-Pop, unity, balance, adaptive, development',
    five: 'Hinkie-Wink, process, tanking',
    six: 'Bragains-Buffett, value investments, discipline, patience',
    seven: 'Musketeer, risk-taking, boundary-pushing, unconventional',
    eight: 'Royals, aggressive, competetive, outmaneuver, relentless',
};

  constructor() {}

  getFantasyStrategy(strategy: string): string {
    return this.fantasyStrategy[strategy] || '';
  }

  getDynastyStrategy(strategy: string): string {
    return this.dynastyStrategy[strategy] || '';
  }

  getManagerStyle(style: string): string {
    return this.managerStyle[style] || '';
  }
}
