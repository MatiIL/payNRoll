import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { ModalControlService } from '../name-modal/modal-control.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NameModalComponent } from '../name-modal/name-modal.component';
import { OpenAiService } from 'src/app/services/open-ai-service.service';
import { SelectValueService } from 'src/app/services/select-value-service.service';
import { PromptEngineerService } from 'src/app/services/prompt-engineer.service';
import { GeneratedNamesService } from '../../auth-form/gen-names.service';

@Component({
  selector: 'app-name-form',
  templateUrl: './name-form.component.html',
  styleUrls: ['./name-form.component.scss'],
})

export class NameFormComponent implements OnInit {
  teamNameForm!: FormGroup;
  generatedText$: Observable<string> = new Observable<string>();
  generatedNames: string[] = [];
  formSubmitted: boolean = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private modalControlService: ModalControlService,
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private selectValueService: SelectValueService,
    private promptEngineerService: PromptEngineerService,
    private openAiService: OpenAiService,
    private genNamesService: GeneratedNamesService
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

  ngOnInit(): void {
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
    this.loading = true;
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

    const userContent = this.promptEngineerService.buildPrompt(
      form,
      mappedValues
    );

    const systemMessage = {
      role: 'system',
      content:
        'You will be provided with name description and seed words to generate creative NBA fantasy team names.',
    };
    const userMessage = {
      role: 'user',
      content: userContent,
    };

    const messages = [systemMessage, userMessage];

    this.generatedText$ = this.openAiService
      .generateCompletion(messages, 0.9, 30)
      .pipe(
        map((response: any) => {
          const names = response.choices[0].message.content
            .split('\n')
            .slice(0, 3);
            return names;
        }),
        tap({
            complete: () => {
              this.loading = false;
              form.reset(); 
              this.formSubmitted = true;
            }
          })
      );
  }

  clickedName(name: string) {
    const formattedName = name.replace(/^\d+\.\s*/, '');
    this.genNamesService.updateClickedName(formattedName);
    this.activeModal.close();
  }
}