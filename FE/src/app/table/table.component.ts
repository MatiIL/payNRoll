import { Component, OnInit, ViewEncapsulation, Output } from '@angular/core';
import { UserService } from '../services/user-service/user.service';
import { MatTableModule } from '@angular/material/table';
import { TABLE_DATA } from './table-data';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../../../shared/user';
import { OverlayMsgComponent } from './overlay-message/overlay-msg.component';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [
    MatTableModule,
    CommonModule,
    MatTooltipModule,
    OverlayMsgComponent,
  ],
})
export class TableComponent implements OnInit {
  @Output() showOverlay: boolean = false;
  user: User | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userService.userData$.subscribe((userData) => {
      this.user = userData;
      if (this.user) this.showOverlay = true;
    });
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }

  handleTableClick() {
    if (this.showOverlay) {
      this.toggleOverlay();
    }
  }

  displayedColumns: string[] = [
    'סגל סוף עונה',
    'עונה קרובה',
    'עונת 24/25',
    'עונת 25/26',
    'עונת 26/27',
  ];
  dataSource = TABLE_DATA;

  getClass(firstParam: number, secondParam?: string): string {
    if (firstParam !== 0 && secondParam) return '#bcc1c4d7';
    if (firstParam === 0 && secondParam) return 'rgb(224, 178, 178)';
    if (firstParam !== 0) return '#d0d4d7d7';
    return '';
  }

  getRookieTooltips(value: number): string {
    let rookieTooltip;
    switch (value) {
      case 3:
        rookieTooltip = 'אופציונלית - החלטה על מימוש לקראת דראפט האוקשן';
        break;
      case 5:
        rookieTooltip = 'אופציונלית - החלטה על מימוש לקראת דראפט האוקשן';
        break;
      case 7:
        rookieTooltip =
          'אופציונלית - החלטה על מימוש לקראת דראפט האוקשן (לצד החלטה אם להעניק הארכת חוזה, או לתת לצעיר להיכנס לדראפט האוקשן של 2027/28 על תקן RFA)';
        break;
      default:
        rookieTooltip = '';
    }
    return rookieTooltip;
  }
}
