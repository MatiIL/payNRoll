import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import { UserService } from '../services/user-service/user.service';
import { User } from '../../../../shared/user';
import { CollapsedMenuService } from '../services/collapsed-menu-service';
import { Router } from '@angular/router';

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
    trigger('fadeInButton', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  user: User | null = null;
  h1AnimationState: string = '';
  listItem1Visible: boolean = false;
  listItem2Visible: boolean = false;
  listItem3Visible: boolean = false;
  containerVisible: boolean = false;
  buttonVisible: boolean = false;
  isMenuCollapsed: boolean = true;

  constructor(
    private userService: UserService,
    private collapsedMenuService: CollapsedMenuService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.user = userData;
    });

    this.animateNextElements();

    this.collapsedMenuService.getIsMenuCollapsed().subscribe(value => {
      this.isMenuCollapsed = value;
    });
  }

  animateNextElements() {
    this.h1AnimationState = 'bounce';

    setTimeout(() => {
      this.listItem1Visible = true;
    }, 1500);

    setTimeout(() => {
      this.listItem2Visible = true;
    }, 2200);

    setTimeout(() => {
      this.listItem3Visible = true;
    }, 2900);

    setTimeout(() => {
      this.containerVisible = true;
    }, 3600);

    setTimeout(() => {
      this.buttonVisible = true;
    }, 4300);
  }

}
