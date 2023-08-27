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
    
    getDisplayedNextSeasonSalary(element: payRollData): { value: string | number; style: string } {
      if (element.onFinalRoster === 'Auction Draft Budget') {
        const budgetAmount = this.auctionBudget[this.selectedIndex].amount;
        return {
          value: budgetAmount,
          style: budgetAmount === 0 ? 'background-color: #d0d4d7d7;' : 'background-color: #bcc1c4d7;'
        };
      } else {
        return this.showSelectedSalary(element);
      }
    }

    showSelectedSalary(element: payRollData): { value: string | number; style: string } {
      let value: string | number;
      let style: string;
    
      switch (this.selectedPayroll) {
        case 'one':
          value = this.showColumnsForValueOne(element) ? element.nextSeasonSalary[0] : element.nextSeasonSalary[1];
          break;
        case 'two':
          value = this.showColumnsForValueTwo(element) ? element.nextSeasonSalary[0] : element.nextSeasonSalary[1];
          break;
        case 'three':
          value = this.showColumnsForValueThree(element) ? element.nextSeasonSalary[0] : element.nextSeasonSalary[1];
          break;
        default:
          return { value: '', style: '' };
      }
    
      if (Array.isArray(value))  value = value[0];
    
      style = value !== 0 ? 'background-color: #bcc1c4d7;' : 'background-color: #d0d4d7d7;';
      return { value, style };
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

  isString(value: any): boolean {
    return typeof value === 'string';
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
  
  getRookieTooltip(value: number[]): { tooltip: string, style: string} {
    if (this.selectedPayroll === 'two') return { tooltip: '', style: ''};
    let tooltipContent = '';
    let tooltipStyle = '';
    switch (value[0]) {
      case 3:
        tooltipContent = 'אופציונלית - החלטה על מימוש לקראת דראפט האוקשן';
        tooltipStyle = '3px dashed rgb(191, 136, 136)';
        break;
      case 5:
        tooltipContent = 'אופציונלית - החלטה על מימוש לקראת דראפט האוקשן';
        tooltipStyle = '3px dashed rgb(191, 136, 136)';
        break;
      case 7:
        tooltipContent =
          'אופציונלית - החלטה על מימוש לקראת דראפט האוקשן (לצד החלטה אם להעניק הארכת חוזה, או לתת לצעיר להיכנס לדראפט האוקשן של 2027/28 על תקן שחקן חופשי מוגבל)';
          tooltipStyle = '3px dashed rgb(191, 136, 136)';
        break;
      default:
        break;
    }
    return { tooltip: tooltipContent, style: tooltipStyle };
  };


  ngOnDestroy(): void {
    this.selectPayrollService.setSelectedValue('');
    this.componentDestroyed.next();
    this.componentDestroyed.complete();
  }

}