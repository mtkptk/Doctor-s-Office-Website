import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekar-menu-bar',
  templateUrl: './lekar-menu-bar.component.html',
  styleUrls: ['./lekar-menu-bar.component.css']
})
export class LekarMenuBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
      //proveriti da li se radi o menadzeru
  }

  showProfil(){
    this.router.navigate(['lekar/profil']);
  }

  showRazno(){
    this.router.navigate(['lekar/razno']);
  }

  showPregledi(){
    this.router.navigate(['lekar/pregledi']);
  }

  showPromenaLozinke(){
    this.router.navigate(['change-password']);
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
