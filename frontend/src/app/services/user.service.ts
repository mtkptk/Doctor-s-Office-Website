import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Pregled } from '../models/pregled';
import { Termin } from '../models/termin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  updateOn(user: User, prop, val, old_value){
    const data={user: user, prop: prop, val: val, old: old_value};

    return this.http.post(`${this.uri}/user/updateOn`, data);
  }

  getAll(){
    return this.http.get(`${this.uri}/user/getAll`);
  }

  getUserById(user_id){
    const data = {user_id: user_id};

    return this.http.post(`${this.uri}/user/getUserById`, data);

  }

  uploadImage(formData: FormData){
    return this.http.post(`${this.uri}/user/uploadImage`, formData);
  }

  removeImage(user: User){
    const data={user: user}
    return this.http.post(`${this.uri}/user/removeImage`, data);
  }

  changePassword(u: User, n: String, o: String){
    const data = {user: u, new_password: n, old_password: o};

    return this.http.post(`${this.uri}/user/changePassword`, data);

  }

  getAllPreglediByIDs(id: string){
    const data = {id: id};
    return this.http.post(`${this.uri}/user/getAllPreglediByIDs`, data);
  }

  addVrstaPregledaToLekar(id_pregleda: string, id_lekara: string){
    const data = {id_pregleda: id_pregleda, id_lekara: id_lekara};
    return this.http.post(`${this.uri}/user/addVrstaPregledaToLekar`, data);
  }

  deleteTermin(termin: Termin){
    const data={termin: termin};
    return this.http.post(`${this.uri}/user/deleteTermin`, data);
  }

  /*getZauzetostiByIDLekara(id_lekara: string){
    const data = {id_lekara: id_lekara};
    return this.http.post(`${this.uri}/user/getZauzetostiByIDLekara`, data);

  }

  addZauzetost(id_lekara: string, start: number, duration: number, odmor: boolean){
    const data = {id_lekara: id_lekara, start:start, duration: duration, odmor:odmor};
    return this.http.post(`${this.uri}/user/addZauzetost`, data);

  }*/

  addTermin(start: number, duration: number, lekar_id: string, pacijent_id: string, pregled: Pregled, izvestaj: boolean){
    const data = {start: start, duration: duration, lekar_id: lekar_id, pacijent_id: pacijent_id, pregled: pregled, izvestaj:izvestaj};
    return this.http.post(`${this.uri}/user/addTermin`, data);
  }

  getTerminiForPacijent(pacijent_id: string){
    const data = {pacijent_id: pacijent_id};
    return this.http.post(`${this.uri}/user/getTerminiForPacijent`, data);
  }

  getTerminForLekar(lekar_id: string){
    const data = {lekar_id: lekar_id};
    return this.http.post(`${this.uri}/user/getTerminForLekar`, data);

  }

  getIzvestajiForPacijent(pacijent_id: string){
    const data = {pacijent_id: pacijent_id};
    return this.http.post(`${this.uri}/user/getIzvestajiForPacijent`, data);

  }

  dodajIzvestaj(kada: number, lekar_ime: string, lekar_spec: string, razlog: string, dijagnoza: string, terapija: string, kontrola: number, pacijent_id: string, lekar_id: string, termin_id: string){
    const data ={kada: kada, lekar_ime: lekar_ime, lekar_spec: lekar_spec, razlog: razlog, dijagnoza: dijagnoza, terapija: terapija, kontrola: kontrola, pacijent_id: pacijent_id, lekar_id: lekar_id, termin_id};
    return this.http.post(`${this.uri}/user/dodajIzvestaj`, data);
  }

  TerminSetFlagIzvestaj(id_termin: string){
    const data = {id_termin: id_termin};
    return this.http.post(`${this.uri}/user/TerminSetFlagIzvestaj`, data);
  }

  deleteTerminiForPacijent(_id: string){
    const data = {id_termin: _id};
    return this.http.post(`${this.uri}/user/deleteTerminiForPacijent`, data);

  }

  deleteTerminiForLekar(_id: string){
    const data = {id_termin: _id};
    return this.http.post(`${this.uri}/user/deleteTerminiForLekar`, data);

  }

  deleteIzvestajiForPacijent(_id: string){
    const data = {id_termin: _id};
    return this.http.post(`${this.uri}/user/deleteIzvestajiForPacijent`, data);

  }

}
