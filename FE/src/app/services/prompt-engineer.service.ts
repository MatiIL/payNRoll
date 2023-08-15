import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PromptEngineerService {
  constructor() {}

  buildPrompt(form: FormGroup, mappedValues: Record<string, string>): string {
    let nameDescription: string = '';
    let seedWords: string = '';

    const formValues = ['myName', 'nickname', 'city', 'interest'];

    for (const key of formValues) {
      const value = form.value[key];
      if (value) {
        nameDescription = `a team name where ${value} is the noun`;
        break;
      }
    }

    const mappedValuesToExtract = [
      'fantasyStrategy',
      'managerStyle',
      'dynastyStrategy',
    ];

    let selectedValue: string | undefined;

    if (form.value.favTeamNick) {
      selectedValue = form.value.favTeamNick;
    } else {
      for (const key of mappedValuesToExtract) {
        const value = mappedValues[key];
        if (value) {
          selectedValue = value;
          break; 
        }
      }
    }

    if (selectedValue) seedWords = `${selectedValue} and its synonyms`;
    
    const userContent: string = `Name description: ${nameDescription}\n
    Seed words: ${seedWords}`;
    return userContent;
  }
}
