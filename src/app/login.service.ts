import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  login(login: any) {
    if (login.email == "ash_tajer@tajer.com" && login.password == "a$hraf") {
      return true;
    } else {
      return false
    }
  }
}
