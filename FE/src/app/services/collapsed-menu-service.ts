import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CollapsedMenuService {
  private isMenuCollapsedSubject = new BehaviorSubject<boolean>(true);

  setIsMenuCollapsed(value: boolean) {
    this.isMenuCollapsedSubject.next(value);
  }

  getIsMenuCollapsed(): Observable<boolean> {
    return this.isMenuCollapsedSubject.asObservable();
  }
}

