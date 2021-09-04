import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category, Product } from 'src/app/services/modal/category';
import { Router } from '@angular/router';
import { OrderAPIService } from '../service/order.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'vex-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent implements OnInit {

  
  dataSource: any;
  displayedColumns: string[] = [ 'image', 'name', 'quantity', 'price'];
  objectImage
  uploadImageError: boolean = false
  file: File;
  submitAttempt: boolean = false;
  form: FormGroup;
  SubCategories: object
  isModeUpdate: boolean = false;
  updateProduct: Product;
  lat: number;
  lng: number;
  zoom: number = 3

  constructor(
    // private userService: UserService,
    private orderService: OrderAPIService,
    private matSnackBar: MatSnackBar,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private subCategoryService: subCategoryService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      _id: new FormControl(''),
      name: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      totalPrice: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    })



    // Switch between create and update mode
    this.listAllSubCategories();
    this.route.queryParams.subscribe(result => {
      if(!result.id)return;
      this.orderService.getById(result.id).subscribe(result => {
        this.form.patchValue(result);
        this.dataSource = result['packages'];
        console.log(this.form.value);
        console.log("this.form.value");
      })
    })
  }


  
  // Get Form Controls
  get = param => this.form.get(param);

  // Handling Image Url
  getImageUrl = (image: string) => image ? environment.ApiURL + image : "../../../../assets/img/demo/images.jpg";

  
  // Get Data
  listAllSubCategories() {
    this.subCategoryService.listSubCategories().subscribe(result => {
      this.SubCategories = result;
    })
  }


  // Create
  async create() {
    this.submitAttempt = true;
    if (this.form.invalid) {
      this.snackbar.open('Please Fill out all required inputs', 'got it', { duration: 3000, panelClass: ['error'] })
      return;
    }
    let alertController = await this.alertController.create({
      message: "Please Wait",
    });
    await alertController.present();
    // this.userService.create(this.getRequestPayLoad()).subscribe();
    setTimeout(() => {
      this.router.navigate(['/apps/list-users']);
      this.snackbar.open("Add User Successfully", '', { duration: 3000, panelClass: ['success'] })
      alertController.dismiss();
      
    }, 500);
  }
  
  
  
  

  // Update
  async update() {
    if (this.form.invalid) {
      this.snackbar.open("Please Fill out all required inputs", 'Got it', { duration: 3000, panelClass: ['error'] });
      return;
    }

    let loadingController = await this.loadingController.create({
      message: "Please Wait..."
    });

    loadingController.present();

    // this.userService.update(this.getRequestPayLoad()).subscribe();
    setTimeout(() => {
      this.snackbar.open("User Updated Successfully", "", { duration: 3000, panelClass: ['success'] })
      loadingController.dismiss();
      this.router.navigate(['/apps/list-users']);
    }, 500);
  }

  

  // When Location Changed by a marker
  locationChanged(event) {
    this.get('latitude').setValue(event.latLng.lat());
    this.get('longitude').setValue(event.latLng.lng());

  }

    async complete() {
    const loading = await this.loadingController.create({
      message: "Please Wait"
    })
    
    const alertController = this.alertController.create({
      header: "Confirm",
      message: "Are you sure to Complete This Order",
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
          text: "toggle",
          role: "Toggle",
          cssClass: "secondary",
          handler: async () => {
            loading.present()

            console.log(this.form.get('_id').value);

            // Here Code To Complete The Order
            this.orderService.completeOrder(this.form.get('_id').value).subscribe()
            
            setTimeout(s => {
              this.matSnackBar.open("Order has been Toggle Status", '' , { duration: 5000, panelClass: ['success'] });
              loading.dismiss()
            }, 1500)
          }
        }
      ]
    });
    (await alertController).present();

    
  }

  

}
