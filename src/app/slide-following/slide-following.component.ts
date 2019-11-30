import { Component, OnInit } from '@angular/core';
import { SlidesService } from "../slides.service";
import { Slide } from "../slide";
import { RandomBackFont } from "../random-back-font";

@Component({
  selector: 'app-slide-following',
  templateUrl: './slide-following.component.html',
  styleUrls: ['./slide-following.component.scss']
})
export class SlideFollowingComponent implements OnInit {

  slides: Array<Slide>;
  rbf = new RandomBackFont();
  tags: string[]=[];
  font: string[]=[];
  back: string[]=[];
  random_colors: {_back:string, _font:string} = {'_back':'','_font':''};
  bgColor: string;

  constructor(private _slidesService: SlidesService) { 
    this.bgColor = '4B4949';
  }

  ngOnInit() {
    this._slidesService.getRecentSlides().subscribe(res => this.slides = res);
  }
  
  getColor(name:string){
    if(!(this.tags.indexOf(name)>-1)){
      this.tags.push(name);
      this.rbf = new RandomBackFont();
      this.random_colors = this.rbf.get_colors();
      this.font.push(this.random_colors._font);
      // console.log(this.random_colors._font);
      this.back.push(this.random_colors._back);
    }
    var obj = {
      color: this.font[this.tags.indexOf(name)], back: this.back[this.tags.indexOf(name)]
    }
    // console.log(obj.color);
    return obj;
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
