import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize, map } from 'rxjs/operators';
import { CategoryService } from 'src/@vex/services/category.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category, SubCategory } from 'src/app/services/modal/category';

@Component({
  selector: 'vex-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})
export class AddSubCategoryComponent implements OnInit {
  subCategoryForm: FormGroup;
  url: string;
  file: File;
  path
  Categories: object[];

  
  constructor(
    private matSnackBar: MatSnackBar,
    private loadingController: LoadingController,
    private categoryService: CategoryService,
    private modalController: ModalController,
    private subCategoryService: subCategoryService) { }

  ngOnInit() {
    this.subCategoryForm = new FormGroup({
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl(''),
      parentCategory: new FormControl('', Validators.required),
      imageUrl: new FormControl(),
    })

    this.getAllCategories();
    this.listCategories();
  }

  getFileUploader(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      this.file = e.target.files[0];
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  listCategories() {
    this.categoryService.listCategories().subscribe(result => {
      this.Categories = result;
    })
  }

  async createSubCategory(subCategory: SubCategory) {

    if(this.subCategoryForm.invalid) {
      this.matSnackBar.open("Please Fill Out All Required Inputs!")
      return;
    } 

    const loading = this.loadingController.create({
      message: "Please Wait"
    });

    let requestPayLoad = {
      englishNameSubCategory: this.subCategoryForm.get("englishName").value, 
      arabicNameSubCategory: this.subCategoryForm.get("arabicName").value, 
      parentId: this.subCategoryForm.get("parentCategory").value
    }
    
    this.subCategoryService.createNewSubCategory(requestPayLoad).subscribe()
    
    
    setTimeout(async () => {
      (await loading).dismiss();
      this.dismissModal();
      this.matSnackBar.open("Sub Category Added Successfully", '', { duration: 30000 });
    }, 500)

  }

  async saveSubCategory(subCategory: SubCategory) {

    const loadingController = this.loadingController.create({
      message: "Please Wait"
    })
    ;(await loadingController).present();    

    let requestPayLoad = {

    }
    
    await this.subCategoryService.createNewSubCategory(subCategory).subscribe(() => {
    })
    this.dismissModal();
    this.matSnackBar.open("Add Successfully", '', { duration: 2000 })

    ;(await loadingController).dismiss();
  }


  getAllCategories() {
    

    
  }



}
