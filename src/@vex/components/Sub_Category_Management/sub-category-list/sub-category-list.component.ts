import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/@vex/services/category.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category } from 'src/app/services/modal/category';
import { AddSubCategoryComponent } from '../add-sub-category/add-sub-category.component';
import { UpdateSubCategoryComponent } from '../update-sub-category/update-sub-category.component';

@Component({
  selector: 'vex-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss']
})
export class SubCategoryListComponent implements OnInit {

  displayedColumns: string[] = ['image', 'arabicName', 'englishName', 'action'];
  dataSource;

  constructor(
    private matSnackbar: MatSnackBar,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private subCategoryService: subCategoryService,
    private modalController: ModalController) { }

  ngOnInit(): void {
    this.listSubCategory();
  }

  async addCategory() {
    let modal = await this.modalController.create({
      swipeToClose: true,
      component: AddSubCategoryComponent,
      componentProps: { }
    })

    modal.onDidDismiss().then(result => {
      this.listSubCategory();
    })

    return await modal.present();
  }


  async listSubCategory() {

    let loading = await this.loadingController.create({
      message: "Please Wait"
    });
    
    loading.present();

    this.subCategoryService.listSubCategories().subscribe(result => {
      this.dataSource = result;
    });

    loading.dismiss();
  }
  

  async onDeleteCategory(subCategory) {

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
            this.subCategoryService.deleteSubCategory(subCategory).subscribe()

            
            this.listSubCategory();
            loadingController.dismiss();
            this.matSnackbar.open("SubCategory has been deleted", '', { duration: 3000 })
          }
        }
      ]      
    })
    alertController.present();

    console.log(subCategory);
  }

  getFileUrl(image) {
    return image ? 'http://localhost:5000/' + image : "../../../../assets/img/demo/images.jpg";
  }

  async onUpdateCategory(subCategory) {

    let modal = await this.modalController.create({
      component: UpdateSubCategoryComponent,
      componentProps: { subCategory: subCategory }
    })

    modal.onDidDismiss().then(result => {
      this.listSubCategory();
    })

    return modal.present();

  }
}
