import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: "root"
})
export class UserService { 

    constructor(private http: HttpClient) {}

    getData() {
        return this.http.get<any>(environment.ApiNode + "ListUsers")
    }
    
    create = data => {
        return this.http.post<any>(environment.ApiNode + "AddUser", data)
    }
    
    update(data) {
        return this.http.put<any>(environment.ApiNode + "UpdateUser/" + data._id, data)
    }
    
    deleteUser(id) {
        return this.http.delete<any>(environment.ApiNode + "DeleteUser/" + id);
    }
    
    getById(id) {
        return this.http.get<any>(environment.ApiNode + "GetUserById/" + id)
    }



}