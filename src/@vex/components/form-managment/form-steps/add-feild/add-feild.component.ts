import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { FieldTypes } from 'src/app/services/enums/fieldTypes.enum';
import { ModalController } from '@ionic/angular';
import { LookupsService } from './../../../../services/lookups.service';

@Component({
  selector: 'vex-add-feild',
  templateUrl: './add-feild.component.html',
  styleUrls: ['./add-feild.component.scss']
})
export class AddFeildComponent implements OnInit {

  fromFeild: FormGroup;
  @Output() close = new EventEmitter<string>();
  @Output() result = new EventEmitter<string>();
  submitAttept: boolean;
  fieldTypes: object;
  lookups: object;

  constructor(
    private lookupServise: LookupsService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.getAllLookups();
    this.fromFeild = new FormGroup({
      type: new FormControl('', Validators.required),
      lookups: new FormControl(''),
      deffaultValue: new FormControl(''),
      title: new FormControl('', Validators.required),
      hint: new FormControl('', Validators.required),
      hintAr: new FormControl('', Validators.required),
      errorMessage: new FormControl('', Validators.required),
      errorMessageAr: new FormControl('', Validators.required),
      description_EN: new FormControl('', Validators.required),
      title_AR: new FormControl('', Validators.required),
      description_AR: new FormControl('', Validators.required),
      isRequired: new FormControl(''),
      minimumValue: new FormControl(''),
      maximumValue: new FormControl(''),
      fieldLength: new FormControl(''),
      seekBarProgress: new FormControl(''),
      regularExpression: new FormControl(''),
      shouldValidateRegex: new FormControl(''),
    })
  }

  async getAllLookups() {
    await this.lookupServise.getAllLookupsServise().subscribe(result => {
      this.fieldTypes = result.data.FieldTypes;
      this.lookups = result.data.Lookups;
    })
  }

  dismiss(values: any) {
    this.modalController.dismiss(values);
  }

  createFeild(values: any) {
    this.submitAttept = true;
    if(this.fromFeild.valid){
      this.dismiss(values); 
    }
  }

  showValues() {
    return this.fromFeild.controls.type.value === "11" ? true : false;
  }



}
