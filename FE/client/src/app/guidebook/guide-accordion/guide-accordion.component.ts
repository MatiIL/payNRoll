import { Component, Input } from '@angular/core';
import {NgFor} from '@angular/common';
import {CdkAccordionModule} from '@angular/cdk/accordion';

@Component({
  selector: 'app-guide-accordion',
  templateUrl: './guide-accordion.component.html',
  styleUrls: ['./guide-accordion.component.scss'],
  standalone: true,
  imports: [CdkAccordionModule, NgFor],
})
export class GuideAccordionComponent {
  @Input() items: { subTitle: string, subText: string }[] = [];
  expandedIndex = 0;
}

