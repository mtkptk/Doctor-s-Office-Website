import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-lekari',
  templateUrl: './list-lekari.component.html',
  styleUrls: ['./list-lekari.component.css']
})
export class ListLekariComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.adminService.getAll().subscribe((resp: User[])=>{
      this.svi = resp;
      this.svi_lekari = this.svi.filter(u => u.type.includes("lekar"))
      this.lekari = this.svi_lekari;
    })
  }

  @Input() ispacijent: boolean;

  svi: User[] = [];
  svi_lekari: User[] = [];
  lekari: User[] = [];

  search_ime: string;
  search_prezime: string;
  search_spec: string;
  search_ogranak: string;

  search(){
    if(this.search_ogranak != null && this.search_ime != null && this.search_prezime != null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.name.includes(this.search_ime) && lekar.last_name.includes(this.search_prezime) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak != null && this.search_ime != null && this.search_prezime != null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.name.includes(this.search_ime) && lekar.last_name.includes(this.search_prezime))
    if(this.search_ogranak != null && this.search_ime != null && this.search_prezime == null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.name.includes(this.search_ime) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak != null && this.search_ime != null && this.search_prezime == null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.name.includes(this.search_ime))
    if(this.search_ogranak != null && this.search_ime == null && this.search_prezime != null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.last_name.includes(this.search_prezime) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak != null && this.search_ime == null && this.search_prezime != null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.last_name.includes(this.search_prezime))
    if(this.search_ogranak != null && this.search_ime == null && this.search_prezime == null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak != null && this.search_ime == null && this.search_prezime == null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.ogranak.includes(this.search_ogranak));

    if(this.search_ogranak == null && this.search_ime != null && this.search_prezime != null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.name.includes(this.search_ime) && lekar.last_name.includes(this.search_prezime) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak == null && this.search_ime != null && this.search_prezime != null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.name.includes(this.search_ime) && lekar.last_name.includes(this.search_prezime))
    if(this.search_ogranak == null && this.search_ime != null && this.search_prezime == null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.name.includes(this.search_ime) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak == null && this.search_ime != null && this.search_prezime == null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.name.includes(this.search_ime))
    if(this.search_ogranak == null && this.search_ime == null && this.search_prezime != null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.last_name.includes(this.search_prezime) && lekar.spec.includes(this.search_spec))
    if(this.search_ogranak == null && this.search_ime == null && this.search_prezime != null && this.search_spec == null) this.lekari = this.svi_lekari.filter(lekar=>lekar.last_name.includes(this.search_prezime))
    if(this.search_ogranak == null && this.search_ime == null && this.search_prezime == null && this.search_spec != null) this.lekari = this.svi_lekari.filter(lekar=>lekar.spec.includes(this.search_spec))
    if(this.search_ogranak == null && this.search_ime == null && this.search_prezime == null && this.search_spec == null) this.lekari = this.svi_lekari;
  }

  nameDSC: boolean;
  lastnameDSC: boolean;
  specDSC: boolean;
  ogranakDSC: boolean;
  
  sort(s: string){
    if(s === "name"){
      if(!this.nameDSC){
          this.lekari = this.lekari.sort((a: User, b: User) => {
               if(a.name > b.name) return 1;
               if(a.name < b.name) return -1;
              return 0;   });
        } else {
          this.lekari = this.lekari.sort((a: User, b: User) => {
               if(a.name < b.name) return 1;
               if(a.name > b.name) return -1;
               return 0;  });
      }

      this.nameDSC = !this.nameDSC;
   }

   else if(s === "lastname"){
      if(!this.lastnameDSC){
          this.lekari = this.lekari.sort((a: User, b: User) => {
              if(a.last_name > b.last_name) return 1;
              if(a.last_name < b.last_name) return -1;
              return 0;  });
        }
      else{
        this.lekari = this.lekari.sort((a: User, b: User) => {
          if(a.last_name < b.last_name) return 1;
          if(a.last_name > b.last_name) return -1;
          return 0; });
      }
      this.lastnameDSC = !this.lastnameDSC;
    }
    
    else if(s === "spec"){
      if(!this.specDSC){
        this.lekari = this.lekari.sort((a: User, b: User) => {
             if(a.spec > b.spec) return 1;
             if(a.spec < b.spec) return -1;
             return 0; });
    } else {
      this.lekari = this.lekari.sort((a: User, b: User) => {
        if(a.spec < b.spec) return 1;
        if(a.spec > b.spec) return -1;
        return 0; });
    }
      this.specDSC = !this.specDSC;
    }
    else if(s === "ogranak"){
      if(!this.ogranakDSC){
        this.lekari = this.lekari.sort((a: User, b: User) => {
             if(a.ogranak > b.ogranak) return 1;
             if(a.ogranak < b.ogranak) return -1;
             return 0; });
    } else {
      this.lekari = this.lekari.sort((a: User, b: User) => {
        if(a.ogranak < b.ogranak) return 1;
        if(a.ogranak > b.ogranak) return -1;
        return 0; });
    }
      this.ogranakDSC = !this.ogranakDSC;
    }
  }

  learn_more_about(id: string){
    this.router.navigate(['pacijent/lekari-info', id]);
  }

}
