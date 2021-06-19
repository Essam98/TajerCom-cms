import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { CategoryService } from 'src/@vex/services/category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { map } from 'rxjs/operators/map'
import { Category } from 'src/app/services/modal/category';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['image', 'englishName', 'arabicName', 'action'];
  dataSource;

  constructor(
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
      component: AddCategoryComponent,
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
    
    this.categoryService.listCategories().subscribe(result => {
      this.dataSource = result
    })

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
            this.categoryService.deleteCategory(categoryObject._id).subscribe(result => {

              
              this.getCategoriesList();
              loadingController.dismiss();
              this.matSnackbar.open("Category has been Deleted Successfully", '', { duration: 2000 })
            })
          }
        }
      ]      
    })
    await alertController.present();
    

  }

  async createCategoryNODE() {

    let modal = await this.modalController.create({
      component: UpdateCategoryComponent,
      componentProps: {  }
    })

    modal.onDidDismiss().then(result => {
      this.getCategoriesList();
    })

    return modal.present();
  }
  
  
  

  async onUpdateCategory(category: Category) {

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
