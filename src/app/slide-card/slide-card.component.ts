import { Component, OnInit, ViewChild } from '@angular/core';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss']
})
export class SlideCardComponent implements OnInit {

  @ViewChild('owlElement') owlElement: OwlCarousel;
  bgColor: string;
  left = false;
  right = true;  
  nextStatus=true;  
  prevStatus=true;

  constructor() { 
    this.bgColor = 'DC0530';
  }

  ngOnInit() {
  }

  toHex(decimalNum){return decimalNum.toString(16); }
  toDecimal(hexString){return parseInt(hexString, 16);; }

  add(){
    var decimalPlus15 = this.toDecimal(this.bgColor) + 15;
    this.bgColor = this.toHex(decimalPlus15)
  }

  subtract(){
    var decimalPlus15 = this.toDecimal(this.bgColor) - 15;
    this.bgColor = this.toHex(decimalPlus15)
  }

  nextPage(){
    this.nextStatus = false;
    this.owlElement.next([500]);
    this.owlElement.next([500]);
    this.owlElement.next([500]);
    setTimeout(()=>this.left = true, 200);
    setTimeout(()=> this.nextStatus = true, 400);
  }

  prevPage(){
    this.nextStatus = false;
    this.right = true;
    this.owlElement.previous([500]);
    this.owlElement.previous([500]);
    this.owlElement.previous([500]);
    setTimeout(()=> this.nextStatus = true, 400);
  }

}
