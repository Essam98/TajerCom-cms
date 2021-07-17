import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category, Product } from 'src/app/services/modal/category';
import { Router } from '@angular/router';

@Component({
  selector: 'vex-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  objectImage
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
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      _id: new FormControl(''),
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
        this.fileImageUrl = "http://localhost:5000/" + result?.image
        this.objectImage = result?.image
        
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

  get = param => this.productForm.get(param);

  listAllSubCategories() {
    this.subCategoryService.listSubCategories().subscribe(result => {
      this.SubCategories = result;

      if (!result.length) {
        this.snackbar.open("Please Add at least one sub category and come back", 'Got It', { duration: 3000, panelClass: ['error'] });
      }
      
    })
  }

  async update() {
    if (this.productForm.invalid) {
      this.snackbar.open("Please Fill out all required inputs", 'Got it', { duration: 3000, panelClass: ['error'] });
      return;
    }

    let loadingController = await this.loadingController.create({
      message: "Please Wait..."
    });

    loadingController.present();

    let requestPayLoad = new FormData();

    requestPayLoad.append('englishNameProduct', this.get('englishName')?.value);
    requestPayLoad.append('arabicNameProduct', this.get('arabicName')?.value);
    requestPayLoad.append('englishDescriptionProduct', this.get('englishDescription')?.value);
    requestPayLoad.append('arabicDescriptionProduct', this.get('arabicDescription')?.value);
    requestPayLoad.append('price', this.get('price')?.value);
    requestPayLoad.append('parentId', this.get('parentSubCategory')?.value);
    requestPayLoad.append('totalQuantity', this.get('totalQuantity')?.value);
    requestPayLoad.append('isWholesale', this.get('isWholesale')?.value);
    
    if (this.file) {
      requestPayLoad.append('image', this.file);
    } else {
      requestPayLoad.append('image', this.updateProduct['image']);
    }


    this.productService.updateProduct(this.get('_id')?.value, requestPayLoad).subscribe(res => {

      
    });
    setTimeout(() => {
      this.snackbar.open("Product Updated Successfully", "", { duration: 3000, panelClass: ['success'] })
      loadingController.dismiss();
      this.router.navigate(['/apps/product-management']);
    }, 500);
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

  getRequestPayLoad() {

  }

  async createNewProduct(product: Product) {

    this.submitAttempt = true;
    if (this.productForm.invalid) {
      this.snackbar.open('Please Fill out all required inputs', 'got it', { duration: 3000, panelClass: ['error'] })
      return;
    }

    let alertController = await this.alertController.create({
      message: "Please Wait"
    });
    await alertController.present();

    let requestPayLoad = new FormData();

    requestPayLoad.append('englishNameProduct', this.get('englishName')?.value);
    requestPayLoad.append('arabicNameProduct', this.get('arabicName')?.value);
    requestPayLoad.append('englishDescriptionProduct', this.get('englishDescription')?.value);
    requestPayLoad.append('arabicDescriptionProduct', this.get('arabicDescription')?.value);
    requestPayLoad.append('price', this.get('price')?.value);
    requestPayLoad.append('parentId', this.get('parentSubCategory')?.value);
    requestPayLoad.append('totalQuantity', this.get('totalQuantity')?.value);
    requestPayLoad.append('isWholesale', this.get('isWholesale')?.value);
    
    if (this.file) {
      requestPayLoad.append('image', this.file);
    } else {
      requestPayLoad.append('image', this.objectImage);
    }

    this.productService.createNewProduct(requestPayLoad).subscribe(res => {
    });

    setTimeout(() => {
      this.router.navigate(['/apps/product-management']);
      this.snackbar.open("Add Product Successfully", '', { duration: 3000, panelClass: ['success'] })
      alertController.dismiss();
      
    }, 500);
  }
  
}







