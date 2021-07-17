import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "src/app/services/modal/category";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) {}

    listCategories() {
        return this.http.get<any>(environment.ApiNode + "ListCategories");        
    }

    createNewCategory(category) {
        return this.http.post<any>(environment.ApiNode + "addCategory", category);
    }

    deleteCategory(id: string) {
        return this.http.delete<any>(environment.ApiNode + "DeleteCategory/" + id);
    }

    updateCategory(id, category) {
        return this.http.put<any>(environment.ApiNode + "updateCategory/" + id, category)
    }

    getCategoryById(category) {
        return this.http.get<any>(environment.ApiNode + "getCategoryById/" + category.id   )
    }


    
}



