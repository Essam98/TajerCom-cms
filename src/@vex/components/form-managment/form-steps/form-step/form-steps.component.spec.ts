import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStepsComponent } from './form-steps.component';

describe('FormStepsComponent', () => {
  let component: FormStepsComponent;
  let fixture: ComponentFixture<FormStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
