import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectValueService {
  private fantasyStrategy: { [key: string]: string } = {
    one: 'Balanced Approach: Strive to have a well-rounded team with solid contributions across multiple categories, aiming to be competitive in most areas.',
    two: 'Punt Strategy: Focus on intentionally "punting" one or more categories (e.g., turnovers, free throw percentage) to dominate in other categories',
    three: 'Depth Strategy: Build a deep roster with consistent and reliable contributors to withstand injuries and rest days, maintaining consistent performance.',
    four: 'Identify undervalued players who have the potential to outperform their average draft positions (ADPs) and provide excellent value; and continuously rotate players in and out of your lineup based on their matchups and schedules to optimize weekly performance'
  };

  private dynastyStrategy: { [key: string]: string } = {
    one: 'accumulate as many high-priced elite fantasy players as possible, and retain them as keepers on "max contract" deals (these will be given to players with a 40$ or more purchase price).',
    two: 'build on middle-of-the-pack, "solid" fantasy players, whose purchase price ranges between 10 to 19$ and are eligible to be retained as keepers for three additional years, i.e., as long-term as it gets by the league rules.',
    three: 'accumulate young players on rookie deals and cost-controlled extensions.',
    four: 'saving and padding upcoming auction draft budgest, in anticipation of those auction drafts which would be filled with fantasy studs on expiring contracts'
  };

  private managerStyle: { [key: string]: string } = {
    one: 'Danny Ainge',
    two: 'Sam Presti',
    three: 'Daryl Morey',
    four: 'Bob Myers',
    five: 'Greg Popovich',
    six: 'Sam Hinkie',
    seven: 'Mark Cuban',
    eight: 'Warren Buffett',
    nine: 'Steve Jobs',
    ten: 'Elon Musk',
    eleven: 'Michael Bloomberg',
    twelve: 'George Soros',
    thirteen: 'Logan Roy',
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
