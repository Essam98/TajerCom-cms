import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category, SubCategory } from "src/app/services/modal/category";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class subCategoryService {

    constructor(private http: HttpClient){

    }

    listSubCategories() {
        return this.http.get<any>(environment.ApiNode + "ListSubCategories") 
    }

    createNewSubCategory(subCategory) {
        return this.http.post<any>(environment.ApiNode + "AddSubCategory", subCategory);
    }

    updateSubCategory(subCategory) {
        return this.http.put<any>(environment.ApiNode + "UpdateSubCategory/" + subCategory._id, subCategory );
    }

    getSubCategoryById(subCategory) {
        return this.http.get<any>(environment.ApiNode + "GetSubCategoryById0" + subCategory._id )
    }

    deleteSubCategory(subCategory) {
        return this.http.delete<any>(environment.ApiNode + "DeleteSubCategory/" + subCategory._id );
    }







}