import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Product } from 'src/app/services/modal/category';

@Component({
  selector: 'vex-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  imageUrl: string

  constructor(private modalController: ModalController) { }

  ngOnInit(): void {
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  getFileUploader(event) {

  }

  createNewProduct(product: Product): void {

  }
  
  
}
