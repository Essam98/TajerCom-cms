import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
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
    private storage: AngularFireStorage,
    private _snackBar: MatSnackBar,
    private navParams: NavParams,
    private categoryService: CategoryService,
    private modalController: ModalController) {

      this.category = this.navParams.data.category;
      this.url = this.category.imageUrl
    }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      id: new FormControl(this.category.id, Validators.required),
      englishName: new FormControl(this.category.englishName, Validators.required),
      arabicName: new FormControl(this.category.arabicName),
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

    if (this.newImageUrl) {

      this.storage.storage.refFromURL(this.category['imageUrl']).delete();
      
      setTimeout(s => {
        let filePath = `${category.englishName}-${this.file.name}`; 
        var fileRef = this.storage.ref(filePath);
        
        this.storage.upload(filePath, this.file).snapshotChanges().pipe(finalize(() => {
          fileRef.getDownloadURL().subscribe( async newUrl => {
            category['imageUrl'] = newUrl;
          })
        })
        ).subscribe();
        
        setTimeout(async s => {
          this.categoryService.updateCategory(category).subscribe(async result => {
            
            await (await loading).dismiss();
            this.dismissModal();
            this._snackBar.open("Update Successfully", '', { duration: 2000 })
          })
          await (await loading).dismiss();
        },2500)
      },0)
    } else {
      setTimeout(async s => {
        this.categoryService.updateCategory(category).subscribe(async result => {
          
          await (await loading).dismiss();
          this.dismissModal();
          this._snackBar.open("Update Successfully", '', { duration: 2000 })
        })
        await (await loading).dismiss();
      },0)
    }
  }

  getFileUploder(e) {
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
