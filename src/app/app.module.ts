import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { FormManagmentComponent } from '../@vex/components/form-managment/form-managment/form-managment.component';
import { FormStepsComponent } from '../@vex/components/form-managment/form-steps/form-step/form-steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddStepComponent } from '../@vex/components/form-managment/form-steps/add-step/add-step.component';
import { IonicModule } from '@ionic/angular';
// import { StepsService } from 'src/@vex/services/steps.service';
import { AddFeildComponent } from '../@vex/components/form-managment/form-steps/add-feild/add-feild.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    FormManagmentComponent,
    FormStepsComponent,
    AddStepComponent,
    AddFeildComponent,
  ],
  entryComponents: [
    AddStepComponent
  ],
  imports: [
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    HttpClientModule,
    MatSelectModule, 
    MatInputModule, 
    NgSelectModule,
    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [
    // StepsService,
    FormStepsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
