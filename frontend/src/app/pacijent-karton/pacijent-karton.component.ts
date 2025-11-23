import { Component, OnInit } from '@angular/core';
import { Izvestaj } from '../models/izvestaj';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Termin } from '../models/termin';

@Component({
  selector: 'app-pacijent-karton',
  templateUrl: './pacijent-karton.component.html',
  styleUrls: ['./pacijent-karton.component.css']
})
export class PacijentKartonComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);

    if(JSON.parse(sessionStorage.getItem('user')).type == 'lekar') this.islekar = true;
    this.route.params.subscribe(res=>{
      this.id_pacijent = res['pacijent_id'];
      this.userService.getIzvestajiForPacijent(this.id_pacijent).subscribe((res: Izvestaj[])=>{
        this.izvestaji = res;
        this.izvestaji = this.izvestaji.sort((a, b)=>
        {
          if(a.kada > b.kada) return -1;
          else if(a.kada < b.kada) return 1;
          else return 0;
        }  
        )
        this.userService.getTerminiForPacijent(this.id_pacijent).subscribe((res: Termin[])=>{
          this.termini = res.filter(t => {return !t.izvestaj && t.pacijent_id == this.id_pacijent && new Date(t.start).getTime() <= Date.now()})
          this.show_list = true;
        })
      })
    })
  }

  islekar: boolean;
  id_pacijent: string;
  izvestaji: Izvestaj[];
  termini: Termin[];
  termin_id: string;
  
  show_list: boolean;

  write_date(n: number){
    let date = new Date(n);
    return date;
  }

  dodaj_izvestaj(){
    if(this.termin_id == null) {alert("Odaberite termin"); return;}
    this.router.navigate(['lekar/dodaj-izvestaj', this.id_pacijent, JSON.parse(sessionStorage.getItem('user'))._id, this.termin_id]);
  }

}
