import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class OrderAPIService { 

    constructor(private http: HttpClient) {}

    getData = () => this.http.get(environment.ApiNode + 'ListOrder');
    

    getById(id: string) {
        return this.http.get(environment.ApiNode + 'GetOrderById/' + id); 
    }
    
    completeOrder(order) {
        return this.http.get(environment.ApiNode + 'CompleteOrder/' + order); 
    }
}