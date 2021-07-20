import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { UserService } from '../service/user.service';


@Component({
  selector: 'vex-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

    
  dataSource: any;
  displayedColumns: string[] = [
    'name', 'address', 'phoneNumber', 
    'birthday', 'action'
  ];

  constructor(
    private alertController: AlertController,
    private matSnackBar: MatSnackBar,
    private loadingController: LoadingController,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getProductsList();
  }

  getProductsList() {
    this.userService.getData().subscribe(result => {
      this.dataSource = result;
    })
  }
  

  async onDelete(id: string) {
    const loading = await this.loadingController.create({
      message: "Please Wait"
    })
    
    const alertController = this.alertController.create({
      header: "Confirm",
      message: "Are you sure to delete this User?",
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
            loading.present()
            await this.userService.deleteUser(id).subscribe();
            setTimeout(s => {
              this.getProductsList();
              this.matSnackBar.open("User has been deleted", '' , { duration: 5000, panelClass: ['success'] });
              loading.dismiss()
            }, 500)
          }
        }
      ]
    });
    (await alertController).present();

    
  }


}
