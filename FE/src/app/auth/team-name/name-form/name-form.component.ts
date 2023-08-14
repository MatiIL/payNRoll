import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalControlService } from '../name-modal/modal-control.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../name-modal/name-modal.component';
import { OpenAiService } from 'src/app/services/open-ai-service.service';
import { SelectValueService } from 'src/app/services/select-value-service.service';
import { PromptEngineerService } from 'src/app/services/prompt-engineer.service';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
})
export class NameFormComponent implements OnInit {
  teamNameForm!: FormGroup;
  generatedName: string = '';

  //   configuration = new Configuration({
  //     apiKey: environment.apiKey,
  //   });
  //   openai = new OpenAIApi(this.configuration);

  constructor(
    private formBuilder: FormBuilder,
    private modalControlService: ModalControlService,
    private modalService: NgbModal,
    private selectValueService: SelectValueService,
    private promptEngineerService: PromptEngineerService,
    private openAiService: OpenAiService
  ) {}

  onStrategySelect(event: any) {
    const selectedValue = event.target.value;
    this.teamNameForm.get('fantasyStrategy')?.setValue(selectedValue);
  }

  onDynastySelect(event: any) {
    const selectedValue = event.target.value;
    this.teamNameForm.get('dynastyStrategy')?.setValue(selectedValue);
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
      managerStyle: [''],
    });

    this.modalControlService.openModal$.subscribe(() => {
      this.openModal();
    });
  }

  openModal() {
    const modalRef = this.modalService.open(NameModalComponent, { size: 'xl' });
  }

  async onSubmit(form: FormGroup) {
    const valuesToMap = [
      { controlName: 'fantasyStrategy', serviceMethod: 'getFantasyStrategy' },
      { controlName: 'dynastyStrategy', serviceMethod: 'getDynastyStrategy' },
      { controlName: 'managerStyle', serviceMethod: 'getManagerStyle' },
    ];

    const mappedValues: Record<string, string> = {};

    for (const { controlName, serviceMethod } of valuesToMap) {
      const value = form.get(controlName)?.value;
      const strValue =
        this.selectValueService[serviceMethod as keyof SelectValueService](
          value
        );
      mappedValues[controlName] = strValue;
    }

    const prompt = this.promptEngineerService.buildPrompt(form, mappedValues);

    try {
        this.openAiService.generateCompletion(prompt, 0.6).subscribe({
          next: (completionResponse) => {
            const generatedText = completionResponse.choices[0].text;
            this.generatedName = generatedText;
          },
          error: (error) => {
            console.error('Error generating completion:', error);
          },
        });
      } catch (error) {
        console.error('Error generating completion:', error);
      }
    }
  }
