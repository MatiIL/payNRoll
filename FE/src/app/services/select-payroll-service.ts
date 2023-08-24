import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectPayrollService {
  private selectedValueSubject = new BehaviorSubject<string>('');
  selectedValue$ = this.selectedValueSubject.asObservable();

  setSelectedValue(value: string) {
    this.selectedValueSubject.next(value);
  }

  getSelectedValue(): Observable<string> {
    return this.selectedValueSubject.asObservable();
  }
}

