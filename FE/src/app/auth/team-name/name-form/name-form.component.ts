import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalControlService } from '../name-modal/modal-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../name-modal/name-modal.component';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss']
})
export class NameFormComponent implements OnInit {
  teamNameForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalControlService: ModalControlService,
    private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.modalControlService.openModal$.subscribe(() => {
          this.openModal();
        });
      }
    
      openModal() {
        const modalRef = this.modalService.open(NameModalComponent);
        // You can pass data to the modal using modalRef.componentInstance
      }

  // Add form-related logic here
}
