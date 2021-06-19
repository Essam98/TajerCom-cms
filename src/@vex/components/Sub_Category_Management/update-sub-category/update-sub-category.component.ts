import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CategoryService } from 'src/@vex/services/category.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category } from 'src/app/services/modal/category';

@Component({
  selector: 'vex-update-sub-category',
  templateUrl: './update-sub-category.component.html',
  styleUrls: ['./update-sub-category.component.scss']
})
export class UpdateSubCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  subCategory: any
  url: string;
  file: File;
  newImageUrl: string;
  Categories: Category;

  constructor(
    private loadingController: LoadingController,
    private _snackBar: MatSnackBar,
    private navParams: NavParams,
    private subCategoryService: subCategoryService,
    private categoryService: CategoryService,
    private matSnackbar: MatSnackBar,
    private modalController: ModalController) {

      this.subCategory = this.navParams.data.subCategory;
    }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      id: new FormControl(this.subCategory?._id, Validators.required),
      englishName: new FormControl(this.subCategory?.englishNameSubCategory, Validators.required),
      arabicName: new FormControl(this.subCategory?.arabicNameSubCategory),
    })
  }

  dismissModal() {
    this.modalController.dismiss();
  }



  
  async updateCategory(category: Category) {

    if(this.categoryForm.invalid) {
      this._snackBar.open("Please fill all required inputs", '', { duration: 2000 })
      return;
    }
    const loading = this.loadingController.create({
      message: "Please Wait"
    })
    
    await (await loading).present();
    let requestPayLoad = {
      _id: this.categoryForm.get("id").value,
      englishNameSubCategory: this.categoryForm.get("englishName").value,
      arabicNameSubCategory: this.categoryForm.get("arabicName").value,
    }

    this.subCategoryService.updateSubCategory(requestPayLoad).subscribe();
    
    setTimeout(async s => {
      (await loading).dismiss();
      this.dismissModal();
      this.matSnackbar.open("SubCategory Updated Successfully");
    }, 500)

  }

  getFileUploader(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      this.file = e.target.files[0];
      reader.onload = (event: any) => {
        this.newImageUrl = event.target.result
      }
    }
  }
  
}
