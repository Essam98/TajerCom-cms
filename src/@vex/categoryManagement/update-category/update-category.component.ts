import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
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

  constructor(
    private navParams: NavParams,
    private categoryService: CategoryService,
    private modalController: ModalController) {

      this.category = this.navParams.data.category;
      
      console.log(this.category);

      this.url = this.category.image
    }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      id: new FormControl(this.category.id, Validators.required),
      englishName: new FormControl(this.category.englishName, Validators.required),
      arabicName: new FormControl(this.category.arabicName),
    })

    
  }

  getImageUrl(imageName: string){
    let image = '';
    if(imageName){
      // image = 'http://66.45.234.221/api/api/File/Get?name=' + imageName;
      image = environment.ApiURL + 'createCategory/' + imageName;
    }
    return image;
  }
  
  dismissModal() {
    this.modalController.dismiss();
  }

  updateCategory(values: Category) {

    if(this.categoryForm.invalid) {
      return;
    }
    this.categoryService.updateCategory(values).subscribe(result => {
      this.dismissModal();
    })
  }

}
