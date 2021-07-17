import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CategoryService } from 'src/@vex/services/category.service';
import { Category } from 'src/app/services/modal/category';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'vex-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category;
  url: string;
  file: File;
  newImageUrl: string;

  constructor(
    private loadingController: LoadingController,
    private matSnackbar: MatSnackBar,
    private _snackBar: MatSnackBar,
    private navParams: NavParams,
    private categoryService: CategoryService,
    private modalController: ModalController) {

      this.category = this.navParams.data.category;
      this.url = this.category.image
    }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      id: new FormControl(this.category?._id, Validators.required),
      englishName: new FormControl(this.category?.englishNameCategory, Validators.required),
      arabicName: new FormControl(this.category?.arabicNameCategory),
      image: new FormControl(this.category?.image),
    })
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  async updateCategory(category: Category) {

    if(this.categoryForm.invalid) {
      this._snackBar.open("Please fill all required inputs", 'Got It', { duration: 2000 })
      return;
    }
    const loading = this.loadingController.create({
      message: "Please Wait..."
    })
    await (await loading).present();

    let requestPayLoad = new FormData();
    
    requestPayLoad.append('_id', this.category._id)
    requestPayLoad.append('englishNameCategory', this.categoryForm.get('englishName').value)
    requestPayLoad.append('arabicNameCategory', this.categoryForm.get('arabicName').value)
    if (this.file) {
      requestPayLoad.append('image', this.file);
    }

    this.categoryService.updateCategory(this.category._id, requestPayLoad).subscribe(result => {
      
    })
    
    setTimeout(async s => {
      await (await loading).dismiss();
      this.modalController.dismiss();
    }, 500);

    this.matSnackbar.open("Category Updated Successfully", 'Close', { duration: 3000 })
  }

  getFileUploader(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      this.file = e.target.files[0];
      reader.onload = (event: any) => {
        this.newImageUrl = event.target.result;
        this.category.image = this.newImageUrl;
      }
    }
  }



  getImageUrl = (image) => image ? 'http://localhost:5000/' + image : '../../../../assets/img/demo/images.jpg';


}












