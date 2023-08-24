import { Component, OnInit, ViewEncapsulation, Output, OnDestroy  } from '@angular/core';
import { UserService } from '../services/user-service/user.service';
import { MatTableModule } from '@angular/material/table';
import { payRollData } from './table-data';
import { TABLE_DATA } from './table-data';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { User } from '../../../../shared/user';
import { OverlayMsgComponent } from './overlay-message/overlay-msg.component';
import { AuthService } from '../auth/auth.service';
import { SelectPayrollService } from '../services/select-payroll-service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

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

export class TableComponent implements OnInit, OnDestroy  {
  @Output() showOverlay: boolean = false;
  user: User | null = null;
  isLoggedIn: boolean = false;
  selectedPayroll: string = 'one';
  selectedData: payRollData[] = TABLE_DATA;
  selectedIndex: number = 0;
  private componentDestroyed = new Subject<void>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private selectPayrollService: SelectPayrollService,

  ) {}

  ngOnInit(): void {

    this.userService.userData$.subscribe((userData) => {
      this.user = userData;
      if (this.user) this.showOverlay = true;
    });


    this.selectPayrollService.selectedValue$
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(value => {
      this.selectedPayroll = value;

      switch (this.selectedPayroll) {
        case 'one':
          this.selectedIndex = 0;
          break;
        case 'two':
          this.selectedIndex = 1;
          break;
        case 'three':
          this.selectedIndex = 2;
          break;
        default:
          this.selectedIndex = 0;
      }
    });

    }

    auctionBudget = [
      { amount: 117, tooltip: "Tooltip for payroll option one" },
      { amount: 100, tooltip: "Tooltip for payroll option two" },
      { amount: 185, tooltip: "Tooltip for payroll option three" }
    ];
    
    getDisplayedNextSeasonSalary(element: payRollData): string | number {
      if (element.onFinalRoster === 'Auction Draft Budget') {
        return this.auctionBudget[this.selectedIndex].amount;
      } else {
        return this.showSelectedSalary(element);
      }
    }

    isString(value: any): boolean {
      return typeof value === 'string';
    }
    

    showSelectedSalary(element: payRollData): string | number {
      switch (this.selectedPayroll) {
        case 'one':
          return this.showColumnsForValueOne(element) ? element.nextSeasonSalary[0] : element.nextSeasonSalary[1];
        case 'two':
          return this.showColumnsForValueTwo(element) ? element.nextSeasonSalary[0] : element.nextSeasonSalary[1];
        case 'three':
          return this.showColumnsForValueThree(element) ? element.nextSeasonSalary[0] : element.nextSeasonSalary[1];
        default:
          return ''; // Handle default case
      }
    }

  showColumnsForValueOne(item: payRollData): boolean {
    return (
      item.onFinalRoster?.includes('Tatum') ||
      item.onFinalRoster?.includes('Bane') ||
      item.onFinalRoster?.includes('Anunoby') ||
      item.onFinalRoster?.includes('McCollum') ||
      item.onFinalRoster?.includes('Edwards') ||
      item.onFinalRoster?.includes('Ingram')
    );
  }

  showColumnsForValueTwo(item: payRollData): boolean {
    return (
      item.onFinalRoster?.includes('Tatum') ||
      item.onFinalRoster?.includes('Lillard') ||
      item.onFinalRoster?.includes('Ayton') ||
      item.onFinalRoster?.includes('Okongwu') ||
      item.onFinalRoster?.includes('McCollum') ||
      item.onFinalRoster?.includes('Ingram')
    );
  }

  showColumnsForValueThree(item: payRollData): boolean {
    return (
      item.onFinalRoster?.includes('Bane') ||
      item.onFinalRoster?.includes('Harris') ||
      item.onFinalRoster?.includes('Hendricks') ||
      item.onFinalRoster?.includes('Edwards') ||
      item.onFinalRoster?.includes('McCollum') ||
      item.onFinalRoster?.includes('Ingram')
    );
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
    'onFinalRoster',
    'nextSeasonSalary',
    'season26Salary',
    'season27Salary',
    'season28Salary',
  ];
  dataSource = this.selectedData;

  getClass(firstParam: number, secondParam?: string): string {
    if (firstParam !== 0 && secondParam) return '#bcc1c4d7';
    if (firstParam === 0 && secondParam) return 'rgb(224, 178, 178)';
    if (firstParam !== 0) return '#d0d4d7d7';
    return '';
  }

  // getTooltip(element: payRollData): string {
  //   if (element.onFinalRoster === 'Auction Draft Budget') {
  //     if (element.nextSeasonSalary[0] === 117) {
  //       return element.tooltipContent && element.tooltipContent[0] ? element.tooltipContent[0] : '';
  //     } else {
  //       return element.tooltipContent && element.tooltipContent[1] ? element.tooltipContent[1] : '';
  //     }
  //   } else {
  //     return '';
  //   }
  // }
  
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

  ngOnDestroy(): void {
    this.selectPayrollService.setSelectedValue('');
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}