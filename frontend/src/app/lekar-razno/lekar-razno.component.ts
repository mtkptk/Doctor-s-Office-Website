import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekar-razno',
  templateUrl: './lekar-razno.component.html',
  styleUrls: ['./lekar-razno.component.css']
})
export class LekarRaznoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    
    if(JSON.parse(sessionStorage.getItem('user')) == null) this.router.navigate(['']);
    else if(JSON.parse(sessionStorage.getItem('user')).type != "lekar") this.router.navigate(['']); 

    this.add_pregled = "/menadzer/add-pregled/" + JSON.parse(sessionStorage.getItem('user')).spec;
  }

  add_pregled: string;

}
