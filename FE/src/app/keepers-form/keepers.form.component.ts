import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-keepers-form',
    templateUrl: './keepers-form.component.html',
    styleUrls: ['./keepers-form.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom,
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule]
  })

  export class KeepersFormComponent {}