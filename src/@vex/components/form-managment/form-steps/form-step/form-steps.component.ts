import { templateJitUrl } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import {  ModalController } from '@ionic/angular';
import { AddStepComponent } from '../add-step/add-step.component';
// import { StepsService } from './../../../../services/steps.service';
import { style } from '@angular/animations';
import { Field } from 'src/app/services/modal/field';
import { Step } from 'src/app/services/modal/step';
import { AddFeildComponent } from '../add-feild/add-feild.component';
import { LookupsService } from 'src/@vex/services/lookups.service';

@Component({
  selector: 'vex-form-steps',
  templateUrl: './form-steps.component.html',
  styleUrls: ['./form-steps.component.scss']
})
export class FormStepsComponent implements OnInit {

  rootForm: FormGroup;
  stepsForm: FormGroup;
  stepsFormUpdate: FormGroup;
  currentObj: Step;
  submitAttempt: boolean;
  allSteps: Array<any> = [];
  stepFields : Field[] = [];
  InsuranceTypes: object;
  DeliveryTypes: object;
  PaymentMethods: object;
  ApprovalTypes: object;
  PaymentTypes: object;

  @ViewChild("rootFormID", { static: false }) rootFormID : FormGroupDirective;

  constructor(
    private lookupService: LookupsService,
    private modalController: ModalController) 
    {
      this.getAllLookups();
    }
    
  ngOnInit(): void {

    this.rootForm = new FormGroup({
      insuranceTypes: new FormControl('', Validators.required),
      deliveryTypes: new FormControl('', Validators.required),
      paymentTypes: new FormControl('', Validators.required),
      approvalTypes: new FormControl('', Validators.required),
      paymentMethods: new FormControl('', Validators.required),
    })

    this.stepsFormUpdate = new FormGroup({
      title_en: new FormControl('', Validators.required),
      description_en: new FormControl('', Validators.required),
      title_ar: new FormControl('', Validators.required),
      description_ar: new FormControl('', Validators.required),
    })
 
  }

  async openAddStepModal(){
    let modal = this.modalController.create({
      component: AddStepComponent,
      swipeToClose: true,
      componentProps: {}
    });
    (await modal).onDidDismiss().then(result => {
      result.data != undefined ? this.allSteps.push(result.data) : null;
      this.getCurrentStep(result.data);
    });
    return (await modal).present(); 
  }


  createRootForm(values) {
    this.submitAttempt = true;
    if (this.rootForm.valid){
      console.log(values);
    }
  }

  submitRootForm() {
    this.rootFormID.onSubmit(undefined);
  }


  formSubmit(values :any) {
    if (this.stepsFormUpdate.valid){
    }
  }

  getCurrentStep(stepObj: Step) {
    this.currentObj = stepObj;

    // Fill All Value In his Select
    this.stepsFormUpdate.controls.title_en.setValue(this.currentObj.title_EN);
    this.stepsFormUpdate.controls.description_en.setValue(this.currentObj.description_EN);
    this.stepsFormUpdate.controls.title_ar.setValue(this.currentObj.title_AR);
    this.stepsFormUpdate.controls.description_ar.setValue(this.currentObj.description_AR);
  }

  async openCreateFieldModal() {
    let modal = this.modalController.create({ 
      component: AddFeildComponent,
      swipeToClose: true,
    });
    (await modal).onDidDismiss().then(result => {
      result.data != undefined ? this.stepFields.push(result.data) : null;
    })
    return (await modal).present(); 
  }
  
  getAllLookups() {
    this.lookupService.getAllLookupsCreationServise().subscribe(result => {
      this.InsuranceTypes = result.data.InsuranceTypes;
      this.DeliveryTypes = result.data.DeliveryTypes;
      this.PaymentMethods = result.data.PaymentMethods;
      this.ApprovalTypes = result.data.ApprovalTypes;
      this.PaymentTypes = result.data.PaymentTypes;
    })


  }


}
