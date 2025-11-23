import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-menadzer-lekari',
  templateUrl: './menadzer-lekari.component.html',
  styleUrls: ['./menadzer-lekari.component.css']
})
export class MenadzerLekariComponent implements OnInit {

  constructor(private adminService: AdminService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "admin") this.router.navigate(['']);

    this.adminService.getAll().subscribe((resp: User[])=>{
      this.svi = resp;
      this.pacijenti = this.svi.filter(u => u.type.includes("lekar"))
    })
  }

  svi: User[] = [];

  pacijenti: User[] = [];
  curr_pacijent: User;

  showPacijenti: boolean = true;
  showEdit: boolean = false;
  showAdd: boolean = false;

  remove(p: User){
    this.userService.removeImage(p).subscribe(resp=>{
      if(resp['message']=='ok') {
        this.adminService.removeLekar(p._id).subscribe(result=>{
          if(result['message']=='ok') {
            this.adminService.releaseName(p.username).subscribe(res=>{
              if(res['message']=='ok') {
                alert('Obrisan.'); this.ngOnInit();
              }
            })
          }
          else alert('Greska.')
        })
      } else{
        alert('Greska.')
      }
    })
    
  }

  show_edit(p: User){
    this.curr_pacijent = p;
    this.showPacijenti = false;
    this.showAdd = false;
    this.showEdit = true;
  }

  edit_canceled(){
    this.showEdit = false;
    this.showAdd = false;
    this.ngOnInit();
    this.showPacijenti = true;
  }

  add_lekar(){
    this.showEdit = false;
    this.showPacijenti = false;
    this.showAdd = true;
  }



}
