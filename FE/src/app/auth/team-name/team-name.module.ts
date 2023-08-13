import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from './name-modal/name-modal.component';
import { NameFormComponent } from './name-form/name-form.component';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
      NameModalComponent,
      NameFormComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModalModule,
      MatInputModule,
      MatFormFieldModule,
      MatSelectModule,
    ],
    exports: [
      NameModalComponent,
      NameFormComponent
    ]
  })
  export class TeamNameModule { }  