import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ProductService } from 'src/@vex/services/product.service';
import { environment } from 'src/environments/environment';
import { OrderAPIService } from '../service/order.service';

@Component({
  selector: 'vex-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss']
})

export class ListOrdersComponent implements OnInit {
    
  dataSource: any;
  displayedColumns: string[] = [ 'name', 'phoneNumber', 'totalPrice', 'status', 'view' ];

  constructor(
    private orderService: OrderAPIService,
    // private alertController: AlertController,
    // private matSnackBar: MatSnackBar,
    // private loadingController: LoadingController,
    // private orderService: OrderService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getOrdersList();
  }

  getOrdersList() {
   this.orderService.getData().subscribe(result => {
      this.dataSource = result;
      console.log(this.dataSource);
    })
  }
  

}
