import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Pregled } from '../models/pregled';

@Component({
  selector: 'app-menadzer-pregledi',
  templateUrl: './menadzer-pregledi.component.html',
  styleUrls: ['./menadzer-pregledi.component.css']
})
export class MenadzerPreglediComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "admin") this.router.navigate(['']);

    this.route.params.subscribe(params=>{
      if(params['zahtev'] === "false") this.isrequest = false;
      else this.isrequest = true;
      this.adminService.getAllPregled().subscribe((resp: Pregled[])=>{
        this.svi_pregledi = resp;
        this.pacijenti = this.svi_pregledi.filter(pregled => pregled.request == this.isrequest && pregled.zakaziv == true);
        this.showPacijenti = true;
      })
    });

  }

  isrequest: boolean;

  svi_pregledi: Pregled[];
  pacijenti: Pregled[];
  showPacijenti: boolean = true;
  showEdit: boolean;
  curr_pregled: Pregled;

  remove(a: Pregled){
    this.adminService.editPregled("zakaziv", false, a._id).subscribe(
      res=>{
        if(res['message']=='ok') {alert("Obrisano."); this.ngOnInit();}
        else alert("Greska.")
      }
    )
  }

  show_edit(a: Pregled){
    this.curr_pregled = a;
    this.showPacijenti = false;
    this.showEdit = true;
  }

  edit_canceled(){
    this.showEdit = false;
    this.ngOnInit();
    this.showPacijenti = true;
  }

  odobri(a: Pregled){
    this.adminService.editPregled("request", false, a._id).subscribe(
      res=>{
        if(res['message']=='ok') {
          this.adminService.editPregled("zakaziv", true, a._id).subscribe(
            res=>{
              if(res['message']=='ok') {alert("Odobreno."); this.ngOnInit();}
              else alert("Greska.")
            }
          )
        }
        else alert("Greska.")
      }
    )
  }

  obrisi(a: Pregled){
    this.adminService.deletePregledRequest(a._id).subscribe(resp=>{
      if(resp['message']=='ok') alert("Zahtev odbijen");
      else alert("Greska.")
    })
  }

}
