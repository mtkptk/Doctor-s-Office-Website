import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-menadzer',
  templateUrl: './login-menadzer.component.html',
  styleUrls: ['./login-menadzer.component.css']
})
export class LoginMenadzerComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
  }

  @ViewChild('login_form') login_form: NgForm;

  username: string;
  password: string;

  message: string;

  login() {

    this.message = "";

    if (this.login_form.valid) {

      //rad sa bazom

      //sessionStorage.setItem('user', )
      this.loginService.login(this.username, this.password).subscribe((userFromDB: User) => {
        if (userFromDB != null) {
          if (userFromDB.type === "admin") {
            sessionStorage.setItem('user', JSON.stringify(userFromDB));
            this.router.navigate(['menadzer'])
          }else {
            this.message = "If you're not an admin, please log in accordingly."
          }
        } else {
          this.message = "Wrong credentials."
        }
      });
    }
  }
}
