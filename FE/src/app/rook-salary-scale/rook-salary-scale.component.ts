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

  sophmoreSalaries: Array<number> = [5, 4, 4, 3, 3, 2, 2, 2, 1, 1, 1];
  fifthYearSalary: number = 0;

  calculateExtension(sophmoreSalary: number) {
    let extensionSalaries: Array<number> = [];
    if (sophmoreSalary * 4 + sophmoreSalary < 10) {
      this.fifthYearSalary = 10;
    } else {
      this.fifthYearSalary = sophmoreSalary * 4 + sophmoreSalary
    }
    extensionSalaries = [this.fifthYearSalary, this.fifthYearSalary + sophmoreSalary, this.fifthYearSalary + 2 * sophmoreSalary];

    return extensionSalaries;
  }


  dataSource = Array.from({ length: 11 }, (_, index) => ({
    column1: `${index + 1}`,
    column2: `${this.sophmoreSalaries[index]}$`,
    column3: `${this.sophmoreSalaries[index] * 2}$`,
    column4: `${this.sophmoreSalaries[index] * 4}$`,
    extendedData: this.calculateExtension(this.sophmoreSalaries[index]),
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
      ];
    } else {
      this.displayedColumns = ['column1', 'column2', 'column3', 'column4'];
    }
  }

}