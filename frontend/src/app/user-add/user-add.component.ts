import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {NgForm} from '@angular/forms'
import { Router } from '@angular/router';
import { FormHandlerService } from '../services/form-handler.service';
import { LoginService } from '../services/login.service';
import { AdminService } from '../services/admin.service';
import { Specijalizacija } from '../models/specijalizacija';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  constructor(private router: Router,
    private formHandlerService: FormHandlerService,
    private userService: LoginService,
    private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getAllSpec().subscribe((spec: Specijalizacija[])=>{
      this.spec_all = spec;
      this.showSpec = true;
    });
  }

  showSpec: boolean;
  spec_all: Specijalizacija[] = [];

  //who?
  @Input() lekar: boolean = false;
  @Output() cancelEvent = new EventEmitter<void>();

  //common fields
  username: string;
  password: string;
  confirm_password: string;
  phone: string;
  email: string;
  message: String = "";

  selectedImage: File;
  imageErrorMessage: string;
  image_path: string;

  //form field
  @ViewChild('registerCommonForm') registerCommonForm: NgForm;

  //agency fields
  licence: string;
  address: string;
  spec: string;
  ogranak: string;

  //client fields
  name: string;
  last_name: string;

  //pictureHandlingMethods

  onFileSelected(event: any): void {
  this.selectedImage = event.target.files[0];
  this.checkImageSize();
}

cancel(){
  if(!this.lekar) this.router.navigate(['']);
  else this.cancelEvent.emit();
}

private checkImageSize(): void {
  if (this.selectedImage) {
    this.formHandlerService.checkImageSize(this.selectedImage)
      .then(result => {
        if (result) {
          // Image size is within the desired range
          const extention = this.selectedImage.name.split('.').pop();
          this.image_path = this.username + "." + extention
          this.imageErrorMessage = '';
        } else {
          // Image size exceeds the desired range
          this.imageErrorMessage = 'Image size should be within the specified range (100x100px and 300x300px). If you proceed, you will get auto-generated profile picture.';
          this.selectedImage = null;
        }
      })
      .catch(error => {
        console.error('Error occurred while checking image size:', error);
      });
  }
}

  //registerMethods

  private errorHandling(): void{

    this.message = this.formHandlerService.formErrorHandling(this.message, this.registerCommonForm);
  }

  public register(): void{
    
    this.message = "";
    let flag: boolean = true;

    if(this.password != null){
    for(let i = 0; i < this.password.length-1; i++){
      let c = this.password[i];
      if(this.password[i] == this.password[i+1]) flag = false;
    }
    } else flag = false;

    if(!(this.password === this.confirm_password)){
      this.message = "Passwords do not match. ";
    } else if(!flag){
      this.message = "Password contains at least one occurence of same characters being one next to another or is null. ";
    }
    else if (this.registerCommonForm.valid) {
      //sa slikom ili bez nje na osnovu selectedImage (da li je null ili ne)
      const formData = new FormData();
    // Append the image file if selected

      this.userService.register(this.lekar, this.username, this.password, this.phone, this.email, this.name, this.last_name, this.licence, this.address, this.spec, this.ogranak, this.image_path).subscribe(
        resp=>{
          if(resp['message']=="ok"){
            if(this.image_path!= null){
            const extention = this.selectedImage.name.split('.').pop();
            formData.append('image', this.selectedImage, this.image_path);
            //formData.append('username', this.username);
            this.userService.uploadImage(formData).subscribe(
              resp=>{
                if(resp['message']== "ok") { 
                  alert("User added."); 
                  this.router.navigate(['']);
                } else alert("Error while uploading picture");
              }
            )}
            else{
              alert("User added.");
              if(this.lekar) this.router.navigate(['menadzer']);
              else this.router.navigate([''])
            }
          }else if(resp['message']=="forbidden_username"){
            alert("Forbidden username or email.")
          }
          else{
            alert("Error.")
          }
        }
      );
      //
    } else {
      //form is invalid, handle validation errors
      this.errorHandling();
    }
  }

}
