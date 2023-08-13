import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalControlService } from '../name-modal/modal-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../name-modal/name-modal.component';
import { environment } from 'src/environments/environment.prod';
import { Configuration, OpenAIApi } from 'openai';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
})
export class NameFormComponent implements OnInit {
  teamNameForm!: FormGroup;

  configuration = new Configuration({
    apiKey: environment.apiKey,
  });
  openai = new OpenAIApi(this.configuration);

  

  constructor(
    private formBuilder: FormBuilder,
    private modalControlService: ModalControlService,
    private modalService: NgbModal
    ) { }

    onStrategySelect(event: any) {
        const selectedValue = event.target.value;
        this.teamNameForm.get('fantasyStrategy')?.setValue(selectedValue);
      }

      onDynastySelect(event: any) {
        const selectedValue = event.target.value;
        this.teamNameForm.get('dynastyStrategy')?.setValue(selectedValue)
      }

      onManagerSelect(event: any) {
        const selectedValue = event.target.value;
        this.teamNameForm.get('managerStyle')?.setValue(selectedValue);
      }

    ngOnInit() {
        this.teamNameForm = this.formBuilder.group({
            myName: [''], 
            nickname: [''],
            city: [''],
            favTeamNick: [''],
            interests: [''],
            fantasyStrategy: [''],
            dynastyStrategy: [''],
            managerStyle: ['']
          });

          

        this.modalControlService.openModal$.subscribe(() => {
          this.openModal();
        });
      }
    
      openModal() {
        const modalRef = this.modalService.open(NameModalComponent, { size: 'xl' });
        // You can pass data to the modal using modalRef.componentInstance
      }

  // Add form-related logic here
}
