import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Form, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
// import { StepsService } from 'src/@vex/services/steps.service';
import { FormStepsComponent } from './../form-step/form-steps.component';

@Component({
  selector: 'vex-add-step',
  templateUrl: './add-step.component.html',
  styleUrls: ['./add-step.component.scss']
})
export class AddStepComponent implements OnInit {
  fromStep: FormGroup;
  disabledBtn: boolean;
  submitAttempt: boolean; 
  @ViewChild("form", { static: false }) form: FormGroupDirective;
  @Input() formValues;
  @Output() newItemEvent = new EventEmitter<string>();
  @Output() close = new EventEmitter<string>();

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
    this.fromStep = new FormGroup({
      title_EN: new FormControl('', Validators.required),
      description_EN: new FormControl('', Validators.required),
      title_AR: new FormControl('', Validators.required),
      description_AR: new FormControl('', Validators.required),
    })
  }

  createStep(values: any[]) {
    this.submitAttempt = true;
    if(this.fromStep.valid) {
      this.formValues = values;
      this.dismiss(values);
    }
  }

  dismiss(values: any) {
    this.modalController.dismiss(values);
  }

  submitForm() {
    this.form.onSubmit(undefined)
  }
}
