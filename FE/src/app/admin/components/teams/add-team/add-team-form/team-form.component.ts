import { 
  Component, 
  Input,
  Output, 
  EventEmitter 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  FormsModule, 
  ReactiveFormsModule,
  Validators 
} from '@angular/forms';
import { TeamModalService } from 'src/app/services/team-modal.service';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class TeamFormComponent {
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() userId: string = '';
  @Input() teamName: string = '';

  ngOnInit(): void {
    console.log('User ID:', this.userId);
    console.log('Team Name:', this.teamName);

    this.teamForm = this.fb.group({
        name: [this.teamName, Validators.required],
        managerId: [this.userId, Validators.required],
        nextYearBudget: ['', Validators.required],
        // Add more form controls as needed
    });
}


  teamForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      managerId: ['', Validators.required],
      nextYearBudget: ['', Validators.required],
      // Add more form controls as needed
    });
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      this.formSubmit.emit(this.teamForm.value);
    }
  }
}