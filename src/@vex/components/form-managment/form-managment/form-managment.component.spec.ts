import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormManagmentComponent } from './form-managment.component';

describe('FormManagmentComponent', () => {
  let component: FormManagmentComponent;
  let fixture: ComponentFixture<FormManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
