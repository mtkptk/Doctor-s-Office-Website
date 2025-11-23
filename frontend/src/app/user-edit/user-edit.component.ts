import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { FormHandlerService } from '../services/form-handler.service';
import { Specijalizacija } from '../models/specijalizacija';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private userService: UserService, private formHandlerService: FormHandlerService, private adminService: AdminService) { }

  ngOnInit(): void {
      this.userService.getUserById(this.user_id).subscribe((usr: User) => {
        this.user = usr;
        this.subjekat = JSON.parse(sessionStorage.getItem('user'));
        this.showUser = true;
        if(JSON.parse(sessionStorage.getItem('user')).type != 'admin') sessionStorage.setItem('user', JSON.stringify(usr));
        this.adminService.getAllSpec().subscribe((spec: Specijalizacija[])=>{
          this.spec_all = spec;
          this.showSpec = true;
        });
      })
    }
  
    showSpec: boolean;
    showUser: boolean;
    spec_all: Specijalizacija[] = [];
  

    @Input() user_id: string;

    @Output() cancelEvent = new EventEmitter<void>();

    user: User;
    subjekat: User;

    name: string;
    last_name: string;
    address: string;
    phone: string;
    email: string;
    licence: string;
    spec: string;
    ogranak: string;

    message: string;
    edit(s: string){

      let val = this.get_param(s);

      this.message = "";

      this.userService.updateOn(this.user, s, val, this.get_old_value(s)).subscribe(
        (resp=>{
          if(resp['message']=="email in use"){
            alert("Failed. Email already taken.");
          }
          else if(resp['message']=="ok"){ 
           alert("User updated.")
           this.ngOnInit();
          }
          else{
            alert("Error in database.")
          }
        })
      );


    }
  
    cancelEdit(){
      this.cancelEvent.emit();
    }

    private get_param(s: string): string{
      switch(s){
        case "name": return this.name;
        case "last_name":  return this.last_name;
        case "address":  return this.address;
        case "phone": return this.phone;
        case "email":  return this.email;
        case "licence": return this.licence;
        case "spec": return this.spec;
        case "ogranak": return this.ogranak;
        default: return "";
      }
    }

    private get_old_value(s: string): string{
      switch(s){
        case "name": return this.user.name;
        case "last_name":  return this.user.last_name;
        case "address":  return this.user.address;
        case "phone": return this.user.phone;
        case "email":  return this.user.email;
        case "licence": return this.user.licence;
        case "spec": return this.user.spec;
        case "ogranak": return this.user.ogranak;
        default: return "";
      }
    }

    //pictureHandlingMethods
  selectedImage: File;
  imageErrorMessage: string;

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
    this.checkImageSize();
  }

  private checkImageSize(): void {
    if (this.selectedImage) {
      this.formHandlerService.checkImageSize(this.selectedImage)
        .then(result => {
          if (result) {
            // Image size is within the desired range
            this.imageErrorMessage = '';
            if(this.user.image_path != null){
            this.userService.removeImage(this.user).subscribe(
              resp=>{
                if(resp['message']=="ok"){
                  //obrisao je postojecu sliku
                  const extention = this.selectedImage.name.split('.').pop();
                  this.user.image_path = this.user.username + "." + extention
                  //napravio je naziv nove slike
                  //dodaje to u formdata
                  const formData: FormData = new FormData();
                  formData.append('image', this.selectedImage, this.user.image_path);
                  //salje na backend
                  this.userService.uploadImage(formData).subscribe(
                    resp=>{
                      if(resp['message']=="ok"){
                        this.userService.updateOn(this.user, "image_path", this.user.image_path, null).subscribe(resp=>{
                          if(resp['message']=="ok"){
                            alert("Image updated.");
                            this.ngOnInit();
                          } else{
                            alert("Error.")
                          }
                        })
                      }
                      else{
                        alert("Error.")
                      }
                    }
                  )
                }
              }
            )}
            else{
              const formData: FormData = new FormData();
              //napravi naziv nove slike
              const extention = this.selectedImage.name.split('.').pop();
              this.user.image_path = this.user.username + "." + extention
              //dodaj to u formdata
              formData.append('image', this.selectedImage, this.user.image_path);
              this.userService.uploadImage(formData).subscribe(
                resp=>{
                  if(resp['message']=="ok"){
                    this.userService.updateOn(this.user, "image_path", this.user.image_path, null).subscribe(resp=>{
                      if(resp['message']=="ok"){
                        alert("Image updated.");
                        this.ngOnInit();
                      } else{
                        alert("Error.")
                      }
                    })
                  }
                  else{
                    alert("Error.")
                  }
                }
              )
            }
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

}
