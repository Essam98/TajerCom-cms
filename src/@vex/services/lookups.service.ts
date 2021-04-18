import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LookupsService {

    constructor(private httpClient: HttpClient) { }

    getAllLookupsServise() {
        return this.httpClient.get<any>(environment.ApiURL + 'Lookup/InitializeFieldCreation' );
    }
    
    getAllLookupsCreationServise() {
        return this.httpClient.get<any>(environment.ApiURL + 'Lookup/InitializeFormCreation' );
    }
}