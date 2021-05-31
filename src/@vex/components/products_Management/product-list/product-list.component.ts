import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/services/modal/category';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'vex-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  dataSource: Product;
  displayedColumns: string[] = 
  [
    'image', 'arabicName', 'englishName', 'price', 
    'totalQuantity', 'categoryName', 'action'
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  getProductsList() {

  }

  async addNewProduct() {

    let modalController = await this.modalController.create({
      component: AddProductComponent,
      swipeToClose: true,
      componentProps: {}, 
    })
    modalController.onDidDismiss().then(() => {
      this.getProductsList();
    })
    return modalController.present();
  }

  async onUpdateProduct(product: Product) {
    let modalController = await this.modalController.create({
      component: UpdateProductComponent,
      swipeToClose: true,
      componentProps: { product: product }, 
    })
    modalController.onDidDismiss().then(() => {
      this.getProductsList();
    })
    return modalController.present();

  }

  onDeleteProduct(product: Product) {

  }

}
