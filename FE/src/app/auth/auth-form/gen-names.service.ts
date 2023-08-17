import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneratedNamesService {
  private generatedNamesSubject = new Subject<string[]>();

  generatedNames$ = this.generatedNamesSubject.asObservable();

  clickedNameEmitter: EventEmitter<string> = new EventEmitter<string>();

  updateClickedName(name: string) {
    this.clickedNameEmitter.emit(name);
  }
}
