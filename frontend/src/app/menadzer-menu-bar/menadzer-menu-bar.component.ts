import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-menu-bar',
  templateUrl: './menadzer-menu-bar.component.html',
  styleUrls: ['./menadzer-menu-bar.component.css']
})
export class MenadzerMenuBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
      //proveriti da li se radi o menadzeru
  }

  showPacijenti(){
    this.router.navigate(['menadzer/pacijenti']);
  }

  showLekari(){
    this.router.navigate(['menadzer/lekari']);
  }

  showRegistracije(){
    this.router.navigate(['menadzer/registracije']);
  }

  showPregledi(){
    this.router.navigate(['menadzer/pregledi', false]);
  }

  showPromenaLozinke(){
    this.router.navigate(['change-password']);
  }

  showSpec(){
    this.router.navigate(['menadzer/specijalizacije']);
  }

  showZahteviPregledi(){
    this.router.navigate(['menadzer/pregledi', true]);
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }

}
