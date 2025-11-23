import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Component({
  selector: 'app-pacijent-profil',
  templateUrl: './pacijent-profil.component.html',
  styleUrls: ['./pacijent-profil.component.css']
})
export class PacijentProfilComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "pacijent") this.router.navigate(['']);

    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  user: User;

  return(){
    this.router.navigate(['pacijent']);
  }

}
