import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { Product } from 'src/app/services/modal/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'vex-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  dataSource: Product;
  displayedColumns: string[] = [
    'image', 'arabicName', 'englishName', 'price', 
    'totalQuantity', 'action'
  ];

  constructor(
    private alertController: AlertController,
    private matSnackBar: MatSnackBar,
    private loadingController: LoadingController,
    private productService: ProductService 
  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.productService.listProducts().subscribe(result => {
      this.dataSource = result;
    })
  }

  getImageUrl = (image: string) => image ? environment.ApiURL + image : "../../../../assets/img/demo/images.jpg";
  

  async onDeleteProduct(product: Product) {
    const alertController = this.alertController.create({
      header: "Confirm",
      message: "Are you sure to delete this product?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            return;
          }
        },
        {
          text: "Delete",
          role: "delete",
          cssClass: "secondary",
          handler: async () => {
            this.productService.deleteProduct(product).subscribe(() => {
              this.getProductsList();
              this.matSnackBar.open("Product has been deleted");
            })
          }
        }
      ]
    });
    (await alertController).present();

    
  }

}







