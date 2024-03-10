import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTeamFormComponent } from '../edit-team-form/edit-team-form.component';

@Component({
  selector: 'app-edit-team-modal',
  templateUrl: './edit-team-modal.component.html',
  styleUrls: ['./edit-team-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, EditTeamFormComponent]
})
export class EditTeamModalComponent implements OnInit {
  @Input() team: any; 

  constructor(public activeModal: NgbActiveModal) {}
  
  ngOnInit(): void {}
}