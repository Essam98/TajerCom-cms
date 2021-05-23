import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CategoryService } from 'src/@vex/services/category.service';
import { Category } from 'src/app/services/modal/category';

@Component({
  selector: 'vex-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  url: string;
  file: File;

  constructor(
    private categoryService: CategoryService,
    private modalController: ModalController) { }

  ngOnInit() {
    this.categoryForm = new FormGroup({
      englishName: new FormControl('', Validators.required),
      arabicName: new FormControl(''),
      image: new FormControl(this.file),
    })
  }

  getFileUploder(e) {
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0])
      this.file = e.target.files[0];
      reader.onload = (event: any) => {
        this.url = event.target.result
      }
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  createCategory(values: Category) {

    if(this.categoryForm.invalid) {
      return;
    }
    values.image = this.file.name
    values.test = "test"

    console.log(values);
    
    this.categoryService.createCategory(values).subscribe(result => {
      this.dismissModal();
    })
  }



}
