import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Specijalizacija } from '../models/specijalizacija';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-menadzer-specijalizacije',
  templateUrl: './menadzer-specijalizacije.component.html',
  styleUrls: ['./menadzer-specijalizacije.component.css']
})
export class MenadzerSpecijalizacijeComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "admin") this.router.navigate(['']);

    this.adminService.getAllSpec().subscribe((spec: Specijalizacija[])=>{
      this.spec = spec;
      this.showSpec = true;
    });
  }

  spec: Specijalizacija[] = [];
  showSpec: boolean;

  new_spec: string;

  add_spec(){
    if(this.new_spec != null){
    if(this.spec.filter(s => s.naziv == this.new_spec).length == 0 || this.spec.length == 0){
      this.adminService.addSpec(this.new_spec).subscribe(resp=>{
        if(resp['message']=="ok") {alert("Dodata specijalizacija."); this.ngOnInit()}
        else alert("Neuspeh.")
      })
    }
  }
}

dodaj_pregled(naziv: string){
  this.router.navigate(['menadzer/add-pregled', naziv]);
}

}
