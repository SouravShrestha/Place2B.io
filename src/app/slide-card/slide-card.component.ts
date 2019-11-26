import { Component, OnInit} from '@angular/core';
import { SlidesService } from "../slides.service";
import { Slide } from "../slide";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RandomBackFont } from "../random-back-font";

@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss']
})
export class SlideCardComponent implements OnInit {

  slides: Array<Slide>;
  rbf = new RandomBackFont();
  curr = 0;
  ID=0;
  bgColor: string;
  left = false;
  right = true;  
  temp_color = 0;
  nextStatus=true;  
  prevStatus=true;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    slideBy: 3,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 3
      }
    },
    nav: false
  }

  constructor(private _slidesService: SlidesService) { 
    this.bgColor = '4B4949';
  }

  ngOnInit() {
    this._slidesService.getRecentSlides().subscribe(res => this.slides = res);
  }

  getID(){
    return "slide-"+ ++this.ID;
  }

  toHex(decimalNum){return decimalNum.toString(16); }
  toDecimal(hexString){return parseInt(hexString, 16); }

  add(){
    var decimalPlus15 = this.toDecimal(this.bgColor) + 15;
    this.bgColor = this.toHex(decimalPlus15);
  }

  subtract(){
    var decimalPlus15 = this.toDecimal(this.bgColor) - 15;
    this.bgColor = this.toHex(decimalPlus15);
  }

  nextPage(){
    setTimeout(()=>this.left = true, 200);
  }

  prevPage(){
    this.right = true;
  }

}
