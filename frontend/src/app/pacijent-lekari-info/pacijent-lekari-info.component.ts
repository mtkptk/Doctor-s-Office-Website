import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { UserService } from '../services/user.service';
import { Pregled } from '../models/pregled';

@Component({
  selector: 'app-pacijent-lekari-info',
  templateUrl: './pacijent-lekari-info.component.html',
  styleUrls: ['./pacijent-lekari-info.component.css']
})
export class PacijentLekariInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, private userService: UserService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(res=>{
      this.id_lekara = res['id'];
      this.userService.getUserById(this.id_lekara).subscribe((res: User)=>{
        this.lekar = res;
        if(JSON.parse(sessionStorage.getItem('user')).type == "pacijent") this.pacijent = true;
        this.adminService.getAllPregled().subscribe((res: Pregled[])=>{
          res = res.filter(p=>!p.request && p.zakaziv && this.lekar.pregledi.includes(p._id));
          this.pregledi = res;
          if(this.pregledi.length!=0)this.showPacijenti = true;
        })
      })
    })
  }

  pacijent: boolean;
  id_lekara: string;
  lekar: User;
  pregledi: Pregled[];
  showPacijenti: boolean;
 // pacijent: User;

 showZakazivanje(pregled: Pregled){
  this.router.navigate(['pacijent/zakazi-pregled/:pregled_id/:lekar_id', {pregled_id: pregled._id, lekar_id: this.lekar._id}]);
 }
}
