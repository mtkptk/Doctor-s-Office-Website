import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormHandlerService } from '../services/form-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { Pregled } from '../models/pregled';

@Component({
  selector: 'app-pregled-add',
  templateUrl: './pregled-add.component.html',
  styleUrls: ['./pregled-add.component.css']
})
export class PregledAddComponent implements OnInit {

  constructor(private formHandlerService: FormHandlerService, private router: Router, private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "lekar" && JSON.parse(sessionStorage.getItem('user')).type != "admin") this.router.navigate(['']); 

    if(JSON.parse(sessionStorage.getItem('user')).type == 'lekar') this.request = true; else this.request = false;
    this.route.params.subscribe(params=>{
      this.spec = params['spec']
      this.adminService.getAllPregled().subscribe((res: Pregled[])=>{
        this.pregledi = res;
        this.pregledi = this.pregledi.filter(p=> p.spec == this.spec)
      })
    });
  }

  pregledi: Pregled[] = []

  request: boolean;
  
  naziv: string;
  cena: number;
  trajanje: number = 30;

  message: String = "";

  spec: string;
  @Output() cancelEvent = new EventEmitter<void>();

  @ViewChild('registerCommonForm') registerCommonForm: NgForm;

  private errorHandling(): void{
    this.message = this.formHandlerService.formErrorHandling(this.message, this.registerCommonForm);
  }

  add_pregled(){

    this.message = "";

    let flag: boolean = true;

    if(this.trajanje == null) this.trajanje = 30;

    this.pregledi.forEach(p=>{
      if(p.naziv == this.naziv){
        this.message = "Pregled sa ovim nazivom vec postoji za ovu specijalizaciju";
        flag = false;
      }
    })


    if(this.registerCommonForm.valid && flag){
      this.adminService.addPregled(this.naziv, this.spec, true, this.cena, this.trajanje, this.request).subscribe(res=>{
        if(res['message']=='ok') {alert("Pregled dodat."); this.router.navigate(['menadzer/specijalizacije']);}
        else alert("Pregled nije dodat");
      })
    } else{
      this.errorHandling();
    }

  }

  cancel(){
     this.router.navigate(['menadzer/specijalizacije'])
  }

}
