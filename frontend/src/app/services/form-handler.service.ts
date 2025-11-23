import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormHandlerService {

  constructor() { }
  public formErrorHandling(message: String, form: NgForm): String{
    const formControls = form.controls;

      for (const controlName in formControls) {
        if (formControls.hasOwnProperty(controlName)) {
          const control = formControls[controlName];

          if (control.invalid) {
            const errors = control.errors;

            if (errors['required']) {
              message += this.beautify(controlName) + " is required. ";
            }

            if (errors['pattern']) {
              message += this.beautify(controlName) + " does not meet the required pattern. ";
            }

            if (errors['maxlength']) {
              message += this.beautify(controlName) + " exceeds the maximum length. ";
            }

            if (errors['minlength']) {
              message += this.beautify(controlName) + " does not meet the minimum length. ";
            }

            if (errors['min']) {
              message += this.beautify(controlName) + " exceeds the minimum value. ";
            }

            if (errors['max']) {
              message += this.beautify(controlName) + " exceeds the maximum value. ";
            }
          }

          /* old monkey code
          
          if (control.invalid) {
            const errors = control.errors;

            if (errors['required']) {
              message += `${controlName} is required. `;
            }

            if (errors['pattern']) {
              message += `${controlName} does not meet the required pattern. `;
            }

            if (errors['maxlength']) {
              message += `${controlName} exceeds the maximum length. `;
            }

            if (errors['minlength']) {
              message += `${controlName} does not meet the minimum length. `;
            }
          }*/
        }
      }
      return message;
  }

  checkImageSize(image: File): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;

          if (width >= 100 && width <= 300 && height >= 100 && height <= 300) {
            // Image size is within the desired range
            resolve(true);
          } else {
            // Image size exceeds the desired range
            resolve(false);
          }
        };
        img.onerror = () => {
          reject('Error occurred while loading image.');
        };
        img.src = event.target.result;
      };
      reader.onerror = () => {
        reject('Error occurred while reading file.');
      };
      reader.readAsDataURL(image);
    });
  }

  /* public async checkImageSize(selectedImage: File, object: StringWrapper): Promise<boolean> {

    object.value = "";
  
    const image = new Image();
    const reader = new FileReader();
  
    const loadPromise = new Promise<boolean>((resolve) => {
      image.onload = () => {
        const width = image.width;
        const height = image.height;
  
        if (width <= 300 && width >= 100 && height <= 300 && height >= 100) {
          object.value = "";
          resolve(true);
        } else {
          object.value = "Image size should be within 100x100 and 300x300 pixels.";
          resolve(false);
        }
      };
    });
  
    reader.readAsDataURL(selectedImage);
  
    await loadPromise;
  
    return true;
  } */
  

  private beautify(src: string): string{
    switch(src){
      case "username": return "Username";
      break;
      case "password": return "Password";
      break;
      case "confirm_password": return "Confirm Password";
      break;
      case "old_password": return "Old Password";
      break;
      case "phone": return "Phone";
      break;
      case "email": return "E-mail";
      break;
      case "name": return "Name";
      break;
      case "last_name": return "Last Name";
      break;
      case "address": return "Address";
      break;
      case "company_number": return "Company Number";
      break;
      case "agency_name": return "Agency Name";
      break;
      case "type": return "Type";
      break;
      case "rooms": return "Number of rooms";
      break;
      case "squares": return "Area";
      break;
      case "new_password": return "New Password";
      break;
      case "licence": return "Licence";
      break;
      case "spec": return "Specijalizacija";
      break;
      case "ogranak": return "Ogranak";
      break;
      default: return "Something";
    }
  }



}

export class StringWrapper {
  constructor(public value: string) {}
}
