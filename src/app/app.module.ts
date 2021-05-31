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
import { CategoryComponent } from '../@vex/components/categories/categoryTable/category.component';
import { AddCategoryComponent } from '../@vex/components/categories/add-category/add-category.component';
import { UpdateCategoryComponent } from '../@vex/components/categories/update-category/update-category.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { ProductListComponent } from '../@vex/components/products_Management/product-list/product-list.component';
import { AddProductComponent } from 'src/@vex/components/products_Management/add-product/add-product.component';
import { UpdateProductComponent } from 'src/@vex/components/products_Management/update-product/update-product.component';
import { SubCategoryListComponent } from '../@vex/components/Sub_Category_Management/sub-category-list/sub-category-list.component';
import { AddSubCategoryComponent } from 'src/@vex/components/Sub_Category_Management/add-sub-category/add-sub-category.component';
import { UpdateSubCategoryComponent } from 'src/@vex/components/Sub_Category_Management/update-sub-category/update-sub-category.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    AddCategoryComponent,
    UpdateCategoryComponent,
    ProductListComponent,
    AddProductComponent,
    SubCategoryListComponent,
    AddSubCategoryComponent,
    UpdateSubCategoryComponent,
  ],
  entryComponents: [
    AddCategoryComponent,
    UpdateCategoryComponent,
    AddProductComponent,
    UpdateProductComponent
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
    MatSnackBarModule,
    MatSelectModule, 
    MatInputModule, 
    NgSelectModule,
    MatTableModule,
    MatAutocompleteModule,
    // Vex
    VexModule,
    CustomLayoutModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB_9jnfGdbamPx6f1kCfcdnYm5fJZ7F4G0",
      authDomain: "tajerproject.firebaseapp.com",
      databaseURL: "https://tajerproject-default-rtdb.firebaseio.com",
      projectId: "tajerproject",
      storageBucket: "tajerproject.appspot.com",
      messagingSenderId: "786110787051",
      appId: "1:786110787051:web:88831b5afdb62e6f1bfdae",
      measurementId: "G-B1GMKL5WC8"
    }),
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
