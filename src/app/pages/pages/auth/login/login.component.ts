import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { Person } from 'src/app/services/modal/person';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  inputType = 'password';
  visible = false;
  invalidLogin: boolean;
  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  send(values:any) {

    if (this.form.valid) {
      let personInfo: Person = { ...values };
  
      let userName = personInfo.email;
      let password = personInfo.password;
      let formData = new FormData();
      formData.append("Username",userName);
      formData.append("Password",password);
  

        this.loginService.login(formData).subscribe(result=>{
          if(result.errorCode === 0){
            this.invalidLogin = false;
            localStorage.setItem("EIAG_Token", result.data.token);
            localStorage.setItem("EIAG_Username", result.data.username);
            this.router.navigate(["/"])
          } else {
            this.invalidLogin = true;
          }
        })
      }

    // this.router.navigate(['/']);
    this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
      duration: 10000
    });
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
