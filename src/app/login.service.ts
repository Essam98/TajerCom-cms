import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }


  // ash_tajer@tajer.com
  // a$hraf

  login(login: any) {
    if (login.email == "ash" && login.password == "123") {
      return true;
    } else {
      return false
    }
  }
}
