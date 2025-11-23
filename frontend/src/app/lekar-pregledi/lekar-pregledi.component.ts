import { Component, OnInit } from '@angular/core';
import { Termin } from '../models/termin';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "lekar") this.router.navigate(['']); 

    this.userService.getTerminForLekar(JSON.parse(sessionStorage.getItem('user'))._id).subscribe((res: Termin[])=>{
      this.termini = res.filter(t=> t.start > Date.now());
      this.termini_izvestaj = res.filter(t=> t.start <= Date.now() && t.izvestaj == false);
      this.termini = this.termini.sort((a, b)=>{
        if(a.start > b.start) return 1;
        else if(a.start < b.start) return -1;
        else return 0;
      })
      this.termini = this.termini.slice(0, 3);
      this.show_termini = true;
    })
  }

  termini: Termin[] = [];
  termini_izvestaj: Termin[] = [];
  show_termini: boolean;

  write_date(n: number){
    let date = new Date(n);
    return date;
  }

  otkazi_termin(t: Termin){}

  show_pacijent(pacijent_id: string){
    this.router.navigate(['lekar/karton', pacijent_id]);
  }

}
