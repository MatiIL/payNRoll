import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TABLE_DATA } from './table-data';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [MatTableModule, CommonModule, MatTooltipModule],
})
export class TableComponent {
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
        rookieTooltip = 'עונת סופמור מובטחת בחוזה הרוקי';
        break;
      case 5:
        rookieTooltip = 'אופציונלית - החלטה על מימוש לקראת עונת סופמור';
        break;
      case 7:
        rookieTooltip = 'אופציונלית - החלטה על מימוש לקראת עונה שלישית';
        break;
      default:
        rookieTooltip = '';
    }
    return rookieTooltip;
  }
}