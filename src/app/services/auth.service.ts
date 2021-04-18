import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  isLoggedIn() {
    let jwt = new JwtHelper();  
    let token = localStorage.getItem('token');
    if (!token) 
      return false;
    let expritionDate = jwt.getTokenExpirationDate(token);
    let isExpired = jwt.isTokenExpired(token);
    return !isExpired;
    return false
  }
}
