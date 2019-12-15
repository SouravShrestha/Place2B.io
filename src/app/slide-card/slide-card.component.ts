import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { SlidesService } from "../slides.service";
import { Slide } from "../slide";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { RandomBackFont } from "../random-back-font";

@Component({
  selector: 'app-slide-card',
  templateUrl: './slide-card.component.html',
  styleUrls: ['./slide-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SlideCardComponent implements OnInit {

  slides: Array<Slide>;
  rbf = new RandomBackFont();
  tags: string[]=[];
  font: string[]=[];
  back: string[]=[];
  random_colors: {_back:string, _font:string} = {'_back':'','_font':''};
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
    lazyLoad:true,
    autoHeight:true,
    autoWidth:true,
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
    this._slidesService.getRecentSlides().subscribe(res => {
      this.slides = res;
    });
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
