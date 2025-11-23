import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormHandlerService } from '../services/form-handler.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  constructor(private router: Router,
    private service: FormHandlerService,
    private userService: UserService) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  user: User;

  old_password: string;
  new_password: string;
  confirm_password: string;

  message: String;

  @ViewChild('changePasswordForm') changePasswordForm: NgForm;

  public changePassword(): void {
    this.message = "";
    let flag: boolean = true;

    if(this.new_password != null){
    for(let i = 0; i < this.new_password.length-1; i++){
      let c = this.new_password[i];
      if(this.new_password[i] == this.new_password[i+1]) flag = false;
    }
  } else flag = false;

    if (!(this.new_password === this.confirm_password)) {
      this.message = "Passwords do not match. ";
    } else if(!flag){
      this.message = "New password contains at least one occurence of same characters being one next to another or is null. ";
    }
    else if (this.changePasswordForm.valid) {
      this.userService.changePassword(this.user, this.new_password, this.old_password).subscribe(resp => {
        if (resp['message'] == "ok") {
          alert("Password changed. Log in again.");
          sessionStorage.clear();
          this.router.navigate(['']);
        } else if (resp['message'] == "wrong old_password") {
          this.message = "Wrong Old Password."
        }
        else {
          this.message = "Error with database."
        }
      })
    } else {
      //form is invalid, handle validation errors
      this.message = this.service.formErrorHandling(this.message, this.changePasswordForm);
    }
  }

}

