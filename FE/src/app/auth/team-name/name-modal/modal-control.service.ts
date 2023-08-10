import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalControlService {
  private openModalSource = new Subject<void>();
  openModal$ = this.openModalSource.asObservable();

  openModal() {
    this.openModalSource.next();
  }
}
