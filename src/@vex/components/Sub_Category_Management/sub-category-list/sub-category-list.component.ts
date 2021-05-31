import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/@vex/services/category.service';
import { Category } from 'src/app/services/modal/category';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';
import { UpdateSubCategoryComponent } from '../update-sub-category/update-sub-category.component';

@Component({
  selector: 'vex-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  displayedColumns: string[] = ['image', 'arabicName', 'englishName', 'childLength', 'action'];
  dataSource;

  constructor(
    private storage: AngularFireStorage,
    private matSnackbar: MatSnackBar,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private categoryService: CategoryService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.getCategoriesList();
  }

  async addCategory() {
    let modal = await this.modalController.create({
      swipeToClose: true,
      component: AddSubCategoryComponent,
      componentProps: {  }
    })

    modal.onDidDismiss().then(result => {
      this.getCategoriesList();
    })

    return await modal.present();
  }


  async getCategoriesList() {

    let loading = await this.loadingController.create({
      message: "Please Wait"
    });
    
    loading.present();
    
    this.categoryService.getCategoriesList().pipe(map(responseData => {

      const categoryArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          categoryArray.push({...responseData[key], id: key})
          loading.dismiss();
        }
      }
      return categoryArray;
      
    })).subscribe(category => {
      this.dataSource = category
    });

    loading.dismiss();
  }
  

  async onDeleteCategory(categoryObject: Category) {

    const loadingController = await this.loadingController.create({
      message: "Please Wait",
    }) 

    const alertController = await this.alertController.create({
      header: "Confirm",
      message: "Are You Sure To Delete This Item?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: "secondary",
          handler: () => {
            return 
          }
        },
        {
          text: "Delete",
          handler: async() => {
            await loadingController.present()
            this.categoryService.deleteCategory(categoryObject.id).subscribe(result => {
              this.getCategoriesList();
              loadingController.dismiss();
              this.matSnackbar.open("Delete Successfully", '', { duration: 2000 })
              this.storage.storage.refFromURL(categoryObject.imageUrl).delete();
            })
          }
        }
      ]      
    })
    await alertController.present();
    

  }

  async onUpdateCategory(category: Category) {

    let modal = await this.modalController.create({
      component: UpdateSubCategoryComponent,
      componentProps: { category: category }
    })

    modal.onDidDismiss().then(result => {
      this.getCategoriesList();
    })

    return modal.present();

  }
}
