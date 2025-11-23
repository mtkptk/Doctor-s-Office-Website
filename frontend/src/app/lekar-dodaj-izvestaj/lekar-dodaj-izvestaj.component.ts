import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-lekar-dodaj-izvestaj',
  templateUrl: './lekar-dodaj-izvestaj.component.html',
  styleUrls: ['./lekar-dodaj-izvestaj.component.css']
})
export class LekarDodajIzvestajComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {

    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "lekar") this.router.navigate(['']); 

    this.route.params.subscribe(res=>{
      this.id_pacijent = res['pacijent_id'];
      this.id_lekar = res['lekar_id'];
      this.id_termin = res['termin_id']
      this.userService.getUserById(this.id_lekar).subscribe((res: User)=>{
        this.lekar = res;
      })
    })
  }

  id_termin: string;
  id_pacijent: string;
  id_lekar: string;
  lekar: User;

  razlog: string;
  dijagnoza: string;
  terapija: string;
  kontrola: string;

  message: string;

  dodaj(){
    this.message = "";
    if(this.razlog == null || this.dijagnoza == null || this.terapija == null || this.kontrola == null) this.message = "Popunite sva polja.";
    else if(new Date(this.kontrola).getTime() <= Date.now()) this.message = "Kontrola ne moze biti u proslosti";  //proveriti dostupnost lekara
    else{
      let ima_mesta: boolean = true;
      this.lekar.zauzetost.forEach(z=> {
        if(z.start > new Date(this.kontrola).getTime() && z.start + z.duration <new Date(this.kontrola).getTime()) ima_mesta = ima_mesta && false;
       
      })
      if(ima_mesta){
        this.userService.dodajIzvestaj(Date.now(), this.lekar.name + " " + this.lekar.last_name, this.lekar.spec, this.razlog, this.dijagnoza, this.terapija, new Date(this.kontrola).getTime(), this.id_pacijent, this.lekar._id, null).subscribe(res=>{
          if(res['message']=='ok'){
            this.userService.TerminSetFlagIzvestaj(this.id_termin).subscribe(res=>{
              if(res['message']=='ok') {alert("Izvestaj dodat."); this.router.navigate(['lekar']);}
              else alert("Greska");
            })
          }
          else alert("Greska.")
        })
    }else{
      this.message = "Niste slobodni u tom terminu";
    }
    }
  }

}
