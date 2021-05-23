import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VexModule } from '../@vex/vex.module';
import { HttpClientModule } from '@angular/common/http';
import { CustomLayoutModule } from './custom-layout/custom-layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryComponent } from '../@vex/categoryManagement/categoryTable/category.component';
import { AddCategoryComponent } from '../@vex/categoryManagement/add-category/add-category.component';
import { UpdateCategoryComponent } from '../@vex/categoryManagement/update-category/update-category.component';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
  ],
  entryComponents: [
    AddCategoryComponent,
  ],
  imports: [
    MatFormFieldModule,
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
    MatTableModule,
    // Vex
    VexModule,
    CustomLayoutModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
