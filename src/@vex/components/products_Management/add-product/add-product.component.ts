import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category, Product } from 'src/app/services/modal/category';

@Component({
  selector: 'vex-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  uploadImageError: boolean = false
  file: File;
  submitAttempt: boolean = false;
  productForm: FormGroup;
  fileImageUrl: string = "../../../../assets/img/demo/upload-1118929_960_720.png";
  SubCategories: object
  updateProduct: Product;
  
  constructor(
    private subCategory: subCategoryService,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private productService: ProductService,
    private alertController: AlertController,
    private subCategoryService: subCategoryService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      _id: new FormControl('', Validators.required),
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl('', Validators.required),
      englishDescription: new FormControl('', Validators.required),
      arabicDescription: new FormControl('', Validators.required),
      parentSubCategory: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      totalQuantity: new FormControl('', Validators.required),
      isWholesale: new FormControl(''),
      productImageUrl: new FormControl(''),
    })

    this.listAllSubCategories();
    this.route.queryParams.subscribe(result => {
      this.productService.getProductById(result.id).subscribe(result => {

        this.updateProduct = result
        
        // Bind All Product Values 
        this.productForm.get('_id').setValue(result._id);     
        this.productForm.get('englishName').setValue(result.englishNameProduct);     
        this.productForm.get('arabicName').setValue(result.arabicNameProduct);     
        this.productForm.get('englishDescription').setValue(result.englishDescriptionProduct);     
        this.productForm.get('arabicDescription').setValue(result.arabicDescriptionProduct);     
        this.productForm.get('parentSubCategory').setValue(result.parentId);     
        this.productForm.get('price').setValue(result.price);     
        this.productForm.get('totalQuantity').setValue(result.totalQuantity);     
        this.productForm.get('isWholesale').setValue(result.isWholesale);     
        // this.productForm.get('productImageUrl').setValue(result.englishNameProduct);     
      })
    })

    
    
  }

  listAllSubCategories() {
    this.subCategoryService.listSubCategories().subscribe(result => {
      this.SubCategories = result;

      if (!result.length) {
        this.snackbar.open("Please Add at least one sub category and come back", '', { duration: 5000 });
      }
      
    })
  }

  async update() {
    if (this.productForm.invalid) {
      this.snackbar.open("Please Fill out all required inputs");
      return;
    }

    let loadingController = await this.loadingController.create({
      message: "Please Wait..."
    });

    loadingController.present();

    let requestPayLoad = {
      _id: this.productForm.get("_id").value,
      englishNameProduct: this.productForm.get("englishName").value,
      arabicNameProduct: this.productForm.get("arabicName").value,
      englishDescriptionProduct: this.productForm.get("englishDescription").value,
      arabicDescriptionProduct: this.productForm.get("arabicDescription").value,
      price: this.productForm.get("price").value,
      totalQuantity: this.productForm.get("totalQuantity").value,
      isWholesale: this.productForm.get("isWholesale").value,
    }

    this.productService.updateProduct(requestPayLoad).subscribe();
    this.snackbar.open("Product Updated Successfully", "Close", { duration: 3000 })
    loadingController.dismiss();
  }

  getFileUploader(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      this.file = e.target.files[0];
      reader.onload = (event: any) => {
        this.fileImageUrl = event.target.result
      }
    }
  }

  async createNewProduct(product: Product) {

    this.submitAttempt = true;
    if (this.productForm.invalid) {
      this.snackbar.open('Please Fill out all required inputs', '', { duration: 3000 })
      return;
    }

    let alertController = await this.alertController.create({
      message: "Please Wait"
    });
    await alertController.present();
      
    let requestPayLoad = {
      englishNameProduct: this.productForm.get("englishName").value,
      arabicNameProduct: this.productForm.get("arabicName").value,
      englishDescriptionProduct: this.productForm.get("englishDescription").value,
      arabicDescriptionProduct: this.productForm.get("arabicDescription").value,
      price: this.productForm.get("price").value,
      totalQuantity: this.productForm.get("totalQuantity").value,
      isWholesale: this.productForm.get("isWholesale").value,
      parentId: this.productForm.get("parentSubCategory").value,
    }

    console.log(requestPayLoad);
    
    this.productService.createNewProduct(requestPayLoad).subscribe();

    this.snackbar.open("Add Product Successfully", 'Close', { duration: 3000 })
  
    alertController.dismiss();
  }
  
}







