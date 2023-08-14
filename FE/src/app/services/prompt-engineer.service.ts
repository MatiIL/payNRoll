import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PromptEngineerService {
  constructor() {}

  buildPrompt(form: FormGroup, mappedValues: Record<string, string>): string {
    const fantasyStrategy = mappedValues['fantasyStrategy'];
    const dynastyStrategy = mappedValues['dynastyStrategy'];
    const managerStyle = mappedValues['managerStyle'];

    const prompt = `ChatGPT, please generate a team for an NBA fantasy team following this set of directions:
    1. Maximum length is 30 characters.
    2. Name should be 1-2 words, unless there's use of 'The' or '&', which can be used as a 3rd word.
    3. If ${form.value.myName} exists, the team name should be along the lines of "myName's [possessive noun], e.g., "Billy's Studs". Same goes for values of ${form.value.city}, as in names of real sports teams.
    4. if ${form.value.favTeamNick} exists, do some creative spin on it, don't just use it as it is.
    5. values from ${form.value.interests}, ${fantasyStrategy}, ${dynastyStrategy} or ${managerStyle}, can be used as adjectives. Regarding the name you recieve from ${managerStyle}, don't just use it as an adjective by itself,
    unless it has a nice ring to it - you can also make use of the persona's buisness management style.
    6. The value of ${form.value.nickname} may be used in a similar manner to that specified on instruction #3, but also as an adjective, depending on what you can make of the nickname's meaning and its syntactic derivations.
    7. If there are too many inputs, give precedence to ${form.value.myName} and ${form.value.city} as proper/common nouns, and to ${fantasyStrategy}, ${dynastyStrategy} or ${managerStyle} as adjectives. If all of the later three inputs are given, find the common aspect of them, some characteristic or quality, and use some appropriate metaphor for it (as in 'Bears' or 'Bulls' from the world of stock trading).
    `

    return prompt;
  }
}
