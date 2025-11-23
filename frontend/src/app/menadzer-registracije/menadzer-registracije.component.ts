import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-registracije',
  templateUrl: './menadzer-registracije.component.html',
  styleUrls: ['./menadzer-registracije.component.css']
})
export class MenadzerRegistracijeComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "admin") this.router.navigate(['']);

    this.adminService.getAllRequests().subscribe((data: User[])=>{
      this.pacijenti = data;})
  }

  pacijenti: User[] = [];
  
  approve(a: User){
    this.adminService.approve_registration_request(a).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert("User added to database.");
        this.ngOnInit();
      } else alert("Error!");
    })
  }

  remove(a: User){
    this.adminService.deny_registration_request(a).subscribe(resp=>{
      if(resp['message']=='ok'){
        alert("User removed from database.");
        this.ngOnInit();
      } else alert("Error!");
    })
  }

}
