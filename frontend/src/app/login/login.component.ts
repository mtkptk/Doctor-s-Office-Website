import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-login', 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
              private loginService: LoginService) { }

  ngOnInit(): void {
  }

  @ViewChild('login_form') login_form: NgForm;

  username: string;
  password: string;

  message: string;

  login(){

    this.message = "";

    if(this.login_form.valid){

    //rad sa bazom

    //sessionStorage.setItem('user', )
    this.loginService.login(this.username, this.password).subscribe((userFromDB: User)=>{
      if(userFromDB!=null){
        if(userFromDB.type ==="lekar"){
          sessionStorage.setItem('user', JSON.stringify(userFromDB));
          this.router.navigate(['lekar/profil'])
        }
        else if(userFromDB.type=="pacijent"){
          sessionStorage.setItem('user', JSON.stringify(userFromDB));
          this.router.navigate(['pacijent/profil']);
        } else{
          this.message = "If you're an admin, please log in accordingly."
        }
      } else{
        this.message = "Wrong credentials."
      }
     });
    }
    else{
      this.message= "Wrong credentials."
    }
   }

}
