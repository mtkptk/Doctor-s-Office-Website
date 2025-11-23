import { Component, OnInit } from '@angular/core';
import { Termin } from '../models/termin';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-pregledi',
  templateUrl: './pacijent-pregledi.component.html',
  styleUrls: ['./pacijent-pregledi.component.css']
})
export class PacijentPreglediComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "pacijent") this.router.navigate(['']);

    this.pacijent = JSON.parse(sessionStorage.getItem('user'));

    this.userService.getAll().subscribe((res: User[]) => {
      this.lekari = res.filter((l: User)=>{ return l.type == "lekar" });
      this.lekari.forEach(l => {
        this.lekar_id_lekar.set(l._id, JSON.stringify(l));
      })

      this.userService.getTerminiForPacijent(this.pacijent._id).subscribe((res: Termin[]) => {
        this.termini = res;
        this.termini = this.termini.filter(t=> t.start + t.duration > Date.now())
        this.termini = this.termini.sort((a: Termin, b: Termin)=>{
          if(a.start > b.start) return 1;
          else  if(a.start < b.start) return -1;
          else return 0;
        })
        this.show_termini = true;
      })
    })
  }

  pacijent: User;
  termini: Termin[] = [];
  lekari: User[] = [];
  show_termini: boolean;

  //pregled_lekar = new Map<string, User>();
  lekar_id_lekar = new Map<string, string>();

  otkazi_termin(termin: Termin) {
    this.userService.deleteTermin(termin).subscribe(res=>{
      if(res['message']=='ok') {alert("Uspeh!"); this.ngOnInit();}
      else alert("Greska.")
    })
  }

  write_ogranak(s: string){
    let a = JSON.parse(s);
    return a.ogranak;
  }

  write_lekar(s: string){
    let a = JSON.parse(s);
    return a.name + " " + a.last_name;
  }

  write_date(n: number){
    let date = new Date(n);
    return date;
  }

}
