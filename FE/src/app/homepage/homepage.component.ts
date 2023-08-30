import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
  AnimationEvent,
} from '@angular/animations';
import { UserService } from '../services/user-service/user.service';
import { User } from '../../../../shared/user';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1900ms ease', style({ transform: 'translateX(0)' })),
      ]),
    ]),
    trigger('bump', [
      transition('* => bounce', [
        animate(
          '800ms ease',
          keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-5px)', offset: 0.2 }),
            style({ transform: 'translateX(5px)', offset: 0.4 }),
            style({ transform: 'translateX(-3px)', offset: 0.6 }),
            style({ transform: 'translateX(3px)', offset: 0.8 }),
            style({ transform: 'translateX(0)', offset: 1 }),
          ])
        ),
      ]),
    ]),
    trigger('fadeInListItems', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 })),
      ]),
    ]),
    trigger('fadeInContainer', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  user: User | null = null;
  h1AnimationState = '';
  h2AnimationState = '';
  listItem1Visible = false;
  listItem2Visible = false;
  listItem3Visible = false;
  containerVisible = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.user = userData;
      this.startBump();
    });
  }

  startBump() {
    this.h1AnimationState = 'bounce';

    setTimeout(() => {
      this.listItem1Visible = true;
    }, 1500);

    setTimeout(() => {
      this.listItem2Visible = true;
    }, 2000);

    setTimeout(() => {
      this.listItem3Visible = true;
    }, 2500);

    setTimeout(() => {
      this.containerVisible = true;
    }, 3500);
  }
}
