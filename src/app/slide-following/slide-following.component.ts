import { Component, OnInit } from '@angular/core';
import { SlidesService } from "../slides.service";
import { Slide } from "../slide";

@Component({
  selector: 'app-slide-following',
  templateUrl: './slide-following.component.html',
  styleUrls: ['./slide-following.component.scss']
})
export class SlideFollowingComponent implements OnInit {

  slides: Array<Slide>;
  bgColor: string;

  constructor(private _slidesService: SlidesService) { 
    this.bgColor = '4B4949';
  }

  ngOnInit() {
    this._slidesService.getRecentSlides().subscribe(res => this.slides = res);
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

}
