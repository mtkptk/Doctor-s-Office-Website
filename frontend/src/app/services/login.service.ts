import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password){
    const data = {username: username, password: password};

    return this.http.post(`${this.uri}/user/login`, data);

  }

  register(lekar, username, password, phone, email, name, last_name, licence, address, spec, ogranak, image_path){
    
    let type: string;

    if(lekar) type = "lekar";
    else type = "pacijent";

    const data = {
      type: type,
      username: username,
      password: password,
      phone: phone,
      email: email,
      name: name,
      last_name: last_name,
      licence: licence,
      address: address,
      spec: spec,
      ogranak: ogranak,
      image_path: image_path
    }

    return this.http.post(`${this.uri}/user/register`, data);

  }

  uploadImage(formData: FormData){
    return this.http.post(`${this.uri}/user/uploadImage`, formData);
  }

  removeImage(user: User){
    const data={user: user}
    return this.http.post(`${this.uri}/user/removeImage`, data);
  }

  addUser(type, username, password, phone, email, photo, name, last_name, licence, address, spec, ogranak, image_path){
    
    const data = {
      type: type,
      username: username,
      password: password,
      phone: phone,
      email: email,
      photo: photo,
      name: name,
      last_name: last_name,
      licence: licence,
      address: address,
      spec: spec,
      ogranak: ogranak,
      image_path: image_path
    }

    return this.http.post(`${this.uri}/user/addUser`, data);

  }

}
