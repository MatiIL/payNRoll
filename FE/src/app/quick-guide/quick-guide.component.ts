import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { quickGuideItems } from './quick-guide-items';

@Component({
  selector: 'app-quick-guide',
  templateUrl: './quick-guide.component.html',
  styleUrls: ['quick-guide.component.scss'],
  standalone: true,
  imports: [CdkAccordionModule, NgFor],
})
export class QuickGuideComponent {
  quickGuideItems: { title: string, content: string }[] =[];
  items = quickGuideItems;
  expandedIndex = 0;
}
