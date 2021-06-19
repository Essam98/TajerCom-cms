import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


  isLoggedIn() {
    let token = localStorage.getItem('Tajer_Token');
    if (!token) return false;
    return true
  }
}
