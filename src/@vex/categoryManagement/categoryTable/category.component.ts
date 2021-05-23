import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/@vex/services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { map } from 'rxjs/operators/map'
import { Category } from 'src/app/services/modal/category';
import { UpdateCategoryComponent } from '../update-category/update-category.component';

@Component({
  selector: 'vex-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['arabicName', 'englishName', 'action'];
  dataSource;

  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  async addCategory() {
    let modal = await this.modalController.create({
      swipeToClose: true,
      component: AddCategoryComponent,
      componentProps: {  }
    })

    modal.onDidDismiss().then(result => {
      this.getCategoriesList();
    })

    return await modal.present();
  }


  getCategoriesList() {
    this.categoryService.getCategoriesList().pipe(map(responeData => {

      const categoryArray = [];
      for (const key in responeData) {
        if (responeData.hasOwnProperty(key)) {
          categoryArray.push({...responeData[key], id: key})
        }
      }
      return categoryArray;
      
    })).subscribe(category => {
      this.dataSource = category
    });
  }
  
  updateCategory(category: Category) {
    console.log(category);
  }

  onDeleteCategory(categoryObject) {
    this.categoryService.deleteCategory(categoryObject.id).subscribe(result => {
      this.getCategoriesList();
    })
  }

  async onUpdateCategory(category) {

    let modal = await this.modalController.create({
      component: UpdateCategoryComponent,
      componentProps: { category: category }
    })

    modal.onDidDismiss().then(result => {
      this.getCategoriesList();
    })

    return modal.present();

  }
}
