import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-lekar-odmor',
  templateUrl: './lekar-odmor.component.html',
  styleUrls: ['./lekar-odmor.component.css']
})
export class LekarOdmorComponent implements OnInit {

  constructor(private userService: UserService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.lekar_id = JSON.parse(sessionStorage.getItem('user'))._id;
  }

  lekar_id: string;
  start: string;
  start_date: Date;
  end: string;
  end_date: Date;
  message: string;

  potvrdi(){
    this.message = "";
    if(this.start == null) {this.message = "Obavezno polje."; return;}
    if(this.end == null) {this.message = "Obavezno polje."; return;}
    this.start_date = new Date(this.start);
    this.end_date = new Date(this.end);
    if(this.start_date.getTime() < Date.now())  this.message = "Datum ne moze biti u proslosti";
    else if(this.end_date.getTime() < Date.now()) this.message = "Datum ne moze biti u proslosti";
    else if(this.end_date.getTime() < this.start_date.getTime()) this.message = "Ne moze se odmor zavrsiti pre nego sto pocne"
    else{
      //provera da li je lekar zauzet, a ako nije, zauzima
      this.userService.getUserById(this.lekar_id).subscribe((res: User)=>{
        let strt = this.start_date.getTime();
        let end = this.end_date.getTime();
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

          this.adminService.addZauzetostLekaru(this.lekar_id, strt, end-strt, true).subscribe(res=>{
            if(res['message']=='ok') {
              alert("Dodato.")
            }
            else alert("Greska");
          })

         
        }
        else{
          this.message = "Zauzeti ste u trazenom terminu."
        }
      })
    }
  }

}
