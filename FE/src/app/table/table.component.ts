import { Component, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TABLE_DATA } from './table-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  standalone: true,
  imports: [MatTableModule, CommonModule],
})

export class TableComponent {
  displayedColumns: string[] = ['סגל סוף עונה', 'עונה קרובה', 'עונת 24/25', 'עונת 25/26', 'עונת 26/27'];
  dataSource = TABLE_DATA;

  getClass(value: number): string {
    if (value !== 0) return '#d0d4d7d7';
    return '';
  }
}

