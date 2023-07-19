import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuieAccordionComponent } from './guide-accordion.component';

describe('GuieAccordionComponent', () => {
  let component: GuieAccordionComponent;
  let fixture: ComponentFixture<GuieAccordionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuieAccordionComponent]
    });
    fixture = TestBed.createComponent(GuieAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
