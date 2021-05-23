import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "src/app/services/modal/category";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CategoryService {

    constructor(private http: HttpClient) {

    }

    createCategory(data: Category) {
        return this.http.post<any>(environment.ApiURL + "createCategory.json", data)
    }

    getCategoriesList() {
        return this.http.get<any>(environment.ApiURL + "createCategory.json");
    }

    deleteCategory(id: string) {
        return this.http.delete<any>(environment.ApiURL + "createCategory/" + id + ".json")
    }

    updateCategory(category) {
        return this.http.patch<any>(environment.ApiURL + "createCategory/" + category.id +".json", category)
    }
}