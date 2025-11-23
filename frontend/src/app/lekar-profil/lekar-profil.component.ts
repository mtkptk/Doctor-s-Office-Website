import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Pregled } from '../models/pregled';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-lekar-profil',
  templateUrl: './lekar-profil.component.html',
  styleUrls: ['./lekar-profil.component.css']
})
export class LekarProfilComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {

    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "lekar" && JSON.parse(sessionStorage.getItem('user')).type != "admin") this.router.navigate(['']); 

    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.showEdit = true;

    this.adminService.getAllPregled().subscribe((res: Pregled[])=>{
      res = res.filter(p=>!p.request && p.zakaziv && this.user.pregledi.includes(p._id));
      this.pregledi = res;
      if(this.pregledi.length!=0)this.showPacijenti = true;
      this.adminService.getAllPregled().subscribe((res: Pregled[])=>{
        this.svi_pregledi = res.filter(p=> p.spec == this.user.spec && p.zakaziv && !p.request && !this.user.pregledi.includes(p._id));
        if(this.svi_pregledi.length!=0) this.new_ready = true;
      })
    })
  }

  user: User;
  pregledi: Pregled[];
  svi_pregledi: Pregled[];
  showPacijenti: boolean;
  showEdit: boolean;

  nov_pregled: string;
  new_ready: boolean;

  dodaj_pregled(){
    if(this.nov_pregled != null){
    this.userService.addVrstaPregledaToLekar(this.nov_pregled, this.user._id).subscribe(res=>{
      if(res['message']=='ok') {alert("Pregled dodat."); this.ngOnInit()}
      else alert('Greska.')
    })
  }
  }


  return(){
    this.router.navigate(['lekar']);
  }



}
