import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-rook-salary-scale',
  templateUrl: './rook-salary-scale.component.html',
  styleUrls: ['./rook-salary-scale.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule]
})
export class RookSalaryScaleComponent {
  rookieSalaries: Array<number> = [4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1]
  sophmoreSalaries: Array<number> = [8, 6, 4, 3, 3, 2, 2, 2, 1, 1, 1];
  fourthYearSalary: number = 0;

  calculateExtension(rookieSalary: number, sophmoreSalary: number) {
    let extensionSalaries: Array<number> = [];
    this.fourthYearSalary = 8 + sophmoreSalary + rookieSalary;
    extensionSalaries = [this.fourthYearSalary, this.fourthYearSalary + sophmoreSalary, this.fourthYearSalary + 2 * sophmoreSalary, this.fourthYearSalary + 3 * sophmoreSalary];

    return extensionSalaries;
  }


  dataSource = Array.from({ length: 11 }, (_, index) => ({
    column1: `${index + 1}`,
    column2: `${this.rookieSalaries[index]}$`,
    column3: `${this.sophmoreSalaries[index]}$`,
    column4: `${this.sophmoreSalaries[index] * 2}$`,
    extendedData: this.calculateExtension(this.rookieSalaries[index], this.sophmoreSalaries[index]),
  }));

  displayedColumns: string[] = ['column1', 'column2', 'column3', 'column4'];
  isExpanded: boolean = false;

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.displayedColumns = [
        'column1',
        'column2',
        'column3',
        'column4',
        'column5',
        'column6',
        'column7',
        'column8',
      ];
    } else {
      this.displayedColumns = ['column1', 'column2', 'column3', 'column4'];
    }
  }

}