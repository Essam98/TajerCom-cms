import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingController, ModalController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { CategoryService } from 'src/@vex/services/category.service';
import { Category } from 'src/app/services/modal/category';

@Component({
  selector: 'vex-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  url: string;
  file: File;
  path
  constructor(
    private matSnackBar: MatSnackBar,
    private loadingController: LoadingController,
    private angularFireStorage: AngularFireStorage,
    private categoryService: CategoryService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl(''),
      imageUrl: new FormControl(),
    })
  }

  getFileUploder(e) {
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

  async createCategory(category: Category) {

    if(this.categoryForm.invalid) {
      return;
    } 

    const loading = this.loadingController.create({
      message: "Please Wait"
    });
    (await loading).present();
    
    let filePath = `${category.englishName}-${this.file.name}`; 
    var fileRef = this.angularFireStorage.ref(filePath);
    
    this.angularFireStorage.upload(filePath, this.file).snapshotChanges().pipe(finalize(() => {
      fileRef.getDownloadURL().subscribe(async url => {
        category['imageUrl'] = url;
        (await loading).dismiss();
        this.storeCategory(category);
      })
    })
    ).subscribe();
  }

  async storeCategory(category: Category) {

    const loadingController = this.loadingController.create({
      message: "Please Wait"
    })
    ;(await loadingController).present();    
    await this.categoryService.createCategory(category).subscribe(() => {
      this.dismissModal();
      this.matSnackBar.open("Add Successfuly", '', { duration: 2000 })
    })

    ;(await loadingController).dismiss();
  }





}
