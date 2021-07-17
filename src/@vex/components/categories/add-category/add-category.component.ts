import { Component, OnInit } from '@angular/core';
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
    private categoryService: CategoryService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl(''),
      // imageUrl: new FormControl(),
    })
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

  async createCategory(category: Category) {

    if(this.categoryForm.invalid) {
      return;
    } 

    const loading = await this.loadingController.create({
      message: "Please Wait..."
    })

    loading.present();

    let requestPayLoad = new FormData();
    
    requestPayLoad.append('englishNameCategory', this.categoryForm.get('englishName').value);
    requestPayLoad.append('arabicNameCategory', this.categoryForm.get('arabicName').value);
    requestPayLoad.append('image', this.file);
    
    this.categoryService.createNewCategory(requestPayLoad).subscribe();
    
    setTimeout(s => {
      loading.dismiss();
      this.dismissModal();
    }, 500)
  }
  


}
