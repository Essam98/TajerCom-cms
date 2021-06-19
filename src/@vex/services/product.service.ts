import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "src/app/services/modal/category";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {}

    listProducts() {
        return this.http.get<any>(environment.ApiNode + "ListProducts");
    }

    createNewProduct(product) {
        return this.http.post<any>(environment.ApiNode + "AddProduct", product);
    }

    updateProduct(product) {
        return this.http.put<any>(environment.ApiNode + "UpdateProduct/" + product._id, product);
    }

    deleteProduct(product) {
        return this.http.delete<any>(environment.ApiNode + "DeleteProduct/" + product._id);
    }

    getProductById(id) {
        return this.http.get<any>(environment.ApiNode + "GetProductById/" + id);
    }

































    


}