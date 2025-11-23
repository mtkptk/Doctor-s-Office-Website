import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pregled } from '../models/pregled';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-pregled-edit',
  templateUrl: './pregled-edit.component.html',
  styleUrls: ['./pregled-edit.component.css']
})
export class PregledEditComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  @Input() user: Pregled;
  @Output() cancelEvent = new EventEmitter<void>();

  trajanje: number;
  cena: number;
  message: string;

  edit(s: string){
    if(s === 'cena'){
      if(this.cena != null){
        if(this.cena > 0){
          this.adminService.editPregled(s, this.cena, this.user._id).subscribe(
            res=>{
              if(res['message'] =='ok') {alert('Changed.'); this.cancelEdit()}
              else alert("Greska!")
            }
          )
        }
      }
    }
    else if(s === 'trajanje'){
      if(this.trajanje != null){
        if(this.trajanje > 0){
          this.adminService.editPregled(s, this.trajanje, this.user._id).subscribe(
            res=>{
              if(res['message'] =='ok') {alert('Changed.'); this.cancelEdit()}
              else alert("Greska!")
            }
          )
        }
      }
    }
  }

  cancelEdit(){
    this.cancelEvent.emit();
  }

}
