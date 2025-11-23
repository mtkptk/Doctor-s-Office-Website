import { Component, OnInit } from '@angular/core';
import { Pregled } from '../models/pregled';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { User, Zauzetost } from '../models/user';

@Component({
  selector: 'app-pacijent-zakazi-pregled',
  templateUrl: './pacijent-zakazi-pregled.component.html',
  styleUrls: ['./pacijent-zakazi-pregled.component.css']
})
export class PacijentZakaziPregledComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "pacijent") this.router.navigate(['']); 


    this.route.params.subscribe(resp=>{
      this.pregled_id = resp['pregled_id'];
      this.lekar_id = resp['lekar_id'];
      this.adminService.getPregledByID(this.pregled_id).subscribe((res: Pregled)=>{
        this.pregled = res;
        this.show = true;
      })
    })
  }

  pregled_id: string;
  lekar_id: string;

  pregled: Pregled;

  start: string;
  start_date: Date;
  message: string;

  show:boolean;

  zakazi(){
    this.message = "";
    if(this.start == null) {this.message = "Obavezno polje."; return;}
    this.start_date = new Date(this.start);
    if(this.start_date.getTime() < Date.now())  this.message = "Datum ne moze biti u proslosti";
    else{
      //provera da li je lekar zauzet, a ako nije, zauzima
      this.userService.getUserById(this.lekar_id).subscribe((res: User)=>{
        let strt = this.start_date.getTime();
        let end = strt + this.pregled.trajanje*60*1000;
        let ima_mesta: boolean = true;
        res.zauzetost.forEach(z=>{
          if(strt > z.start && strt < z.start + z.duration) ima_mesta = ima_mesta && false;
          if(end > z.start && end < z.start + z.duration) ima_mesta = ima_mesta && false;
          if(z.start > strt && z.start < end)ima_mesta = ima_mesta && false;
          if(z.start + z.duration > strt && z.start + z.duration < end) ima_mesta = ima_mesta && false;
        })
        if(ima_mesta){

          /*this.userService.addZauzetost(this.lekar_id, strt, end-strt, false).subscribe(res=>{
            if(res['message']=='ok'){
              this.adminService.addZauzetostLekaru(this.lekar_id, res['_id']).subscribe(resp=>{
                if(resp['message'] == 'ok') alert("Termin zakazan.");  //dodati i termin
                else alert("Greska.");
              })
            }
          })*/

          this.adminService.addZauzetostLekaru(this.lekar_id, strt, end-strt, false).subscribe(res=>{
            if(res['message']=='ok') {
              //alert("Dodato.")
              this.userService.addTermin(strt, end-strt, this.lekar_id, JSON.parse(sessionStorage.getItem('user'))._id, this.pregled, false).subscribe(res=>{
                if(res['message']=='ok'){
                  {alert("Termin zakazan.")}; this.router.navigate['pacijent'];}
                else alert("Greska.")
                
              })
            }
            else alert("Greska");
          })

         
        }
        else{
          this.message = "Lekar je zauzet u trazenom terminu."
        }
      })
    }
  }

}
