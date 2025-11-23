import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  login(username, password){
    const data = {username: username, password: password};

    return this.http.post(`${this.uri}/user/login`, data);

  }

  getAllRequests(){
    return this.http.get(`${this.uri}/user/getAllRequests`);
  }

  approve_registration_request(u: User){
    const data = {user: u};
    return this.http.post(`${this.uri}/user/approve_registration_request`, data);
  }

  deny_registration_request(u: User){
    const data = {user: u};
    return this.http.post(`${this.uri}/user/deny_registration_request`, data);
  }

  getAll(){
    return this.http.get(`${this.uri}/user/getAll`);
  }

  getAllSpec(){
    return this.http.get(`${this.uri}/user/getAllSpec`);
  }

  addSpec(s: string){
    const data = {naziv: s};
    return this.http.post(`${this.uri}/user/addSpec`, data);
  }

  addPregled(naziv: string, spec: string, zakaziv: boolean, cena: number, trajanje: number, request: boolean){
    const data = {naziv: naziv, spec: spec, zakaziv: zakaziv, cena: cena, trajanje: trajanje, request: request};
    return this.http.post(`${this.uri}/user/addPregled`, data);
  }

  getAllPregled(){
    return this.http.get(`${this.uri}/user/getAllPregled`);
  }

  getPregledByID(_id: string){
    const data = {_id:_id};
    return this.http.post(`${this.uri}/user/getPregledByID`, data);
  }

  editPregled(param: string, val, _id: string){
    const data = {param: param, val: val, _id:_id};
    return this.http.post(`${this.uri}/user/editPregled`, data);
  }

  deletePregledRequest(_id: string){
    const data = {_id: _id};
    return this.http.post(`${this.uri}/user/deletePregledRequest`, data);
  } 

  addZauzetostLekaru(id_lekara: string, start: number, duration: number, odmor: boolean){
    const data = {id_lekara: id_lekara, start: start, duration: duration, odmor: odmor};
    return this.http.post(`${this.uri}/user/addZauzetostLekaru`, data);
  }

  removeLekar(_id: string){
    const data = {_id: _id};
    return this.http.post(`${this.uri}/user/removeLekar`, data);
  }

  removePacijent(_id: string){
    const data = {_id: _id};
    return this.http.post(`${this.uri}/user/removePacijent`, data);
  }

  releaseName(username: string){
    const data = {username: username};
    return this.http.post(`${this.uri}/user/releaseName`, data);
  }

}