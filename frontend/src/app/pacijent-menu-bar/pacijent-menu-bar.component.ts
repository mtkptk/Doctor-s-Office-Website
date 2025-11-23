import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-menu-bar',
  templateUrl: './pacijent-menu-bar.component.html',
  styleUrls: ['./pacijent-menu-bar.component.css']
})
export class PacijentMenuBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
      //proveriti da li se radi o menadzeru
  }

  showProfil(){
    this.router.navigate(['pacijent/profil']);
  }

  showLekari(){
    this.router.navigate(['pacijent/lekari']);
  }

  showPregledi(){
    this.router.navigate(['pacijent/pregledi']);
  }

  showPromenaLozinke(){
    this.router.navigate(['change-password']);
  }

  logOut(){
    sessionStorage.clear();
    this.router.navigate(['']);
  }
  showKarton(){
    this.router.navigate(['lekar/karton', JSON.parse(sessionStorage.getItem('user'))._id])
  }

}

