import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from './name-modal/name-modal.component'
import { NameFormComponent } from './name-form/name-form.component'

@NgModule({
    declarations: [
      NameModalComponent,
      NameFormComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModalModule
      // Add other necessary imports here (e.g., Angular Material)
    ],
    exports: [
      NameModalComponent,
      NameFormComponent
    ]
  })
  export class TeamNameModule { }  