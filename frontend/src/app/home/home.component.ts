import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  slides = [
    {img: "assets/doc1.jpg"},
    {img: "assets/doc2.jpg"},
    {img: "assets/doc3.jpg"},
    {img: "assets/doc4.jpg"},
    {img: "assets/doc5.png"},
  ];

  slideConfig = {
    "slidesToShow": 3,
    "slidesToScroll": 2,
    "autoplay": true,
    "autoplaySpeed": 3000,
    "pauseOnHover": true,
    "arrows": true,
    "responsive":[
      {
        "breakpoint": 900,
        "settings": {
        "slidesToShow": 3,
        "slidesToScroll": 1
      }
      },
      {
        "breakpoint": 700,
        "settings": {
        "slidesToShow": 1,
        "slidesToScroll": 1
        }
      }
    ]
  };
  
  slickInit(e) {
    console.log('slick initialized');
  }
  
  breakpoint(e) {
    console.log('breakpoint');
  }
  
  afterChange(e) {
    console.log('afterChange');
  }
  
  beforeChange(e) {
    console.log('beforeChange');
  }

}
