import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeildComponent } from './add-feild.component';

describe('AddFeildComponent', () => {
  let component: AddFeildComponent;
  let fixture: ComponentFixture<AddFeildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
