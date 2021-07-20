import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { subCategoryService } from 'src/@vex/services/sub-category.service';
import { Category, Product } from 'src/app/services/modal/category';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../service/user';

@Component({
  selector: 'vex-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
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
  zoom: number = 1

  constructor(
    private userService: UserService,
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
      birthday: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      longitude: new FormControl('', Validators.required),
      latitude: new FormControl('', Validators.required),
    })



    // Switch between create and update mode
    this.listAllSubCategories();
    this.route.queryParams.subscribe(result => {
      if(!result.id)return;
      this.userService.getById(result.id).subscribe(result => {

        this.isModeUpdate = true;
        this.form.patchValue(result);
      })
    })
  }


  
  // Get Form Controls
  get = param => this.form.get(param);


  
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
    this.userService.create(this.getRequestPayLoad()).subscribe();
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

    this.userService.update(this.getRequestPayLoad()).subscribe();
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



  // Get RequestPayLoad
  getRequestPayLoad(): User {
    let user: User;
    return user = {
      _id: this.get('_id')?.value,
      name: this.get('name')?.value,
      phoneNumber: this.get('phoneNumber')?.value,
      address: this.get('address')?.value,
      birthday: this.get('birthday')?.value,
      longitude: this.get('longitude')?.value, 
      latitude: this.get('latitude')?.value
    }
  }

  

  

  
}
